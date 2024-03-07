import jwt from "jsonwebtoken";

import classeModel from "../../models/classe.js";
import userModel from '../../models/user.js';

export default class Service {

    async createClasse({name, description}, id){
        try {
            const user = await userModel.findById(id);
            const hasClasse = await classeModel.findOne({name});
            if (hasClasse) return { error: "classe_already_exists" };
            const classe = new classeModel({
                name, 
                description,
                teacher: {
                    id: user._id,
                    name: user.name
                }
            }); 
            await classe.save();
            return classe
        } catch (err) {
            return { error: "internal_error" };
        }
    }

    async removeClasse({params}){
        try {
            const hasClasse = await classeModel.findOne({_id: params.id});
            if (!hasClasse) return { error: "classe_not_found" };
            await classeModel.findByIdAndDelete(params.id);
            return;
        } catch (err) {
            return { error: "internal_error" };
        }
    }

    async getClasses({}){
        try {
            return await classeModel.find().sort({ date: -1});
        } catch (err) {
            return { error: "internal_error" };
        }
    }

    async addTimeline({ id, name, description }){
        try {
            const classe = await classeModel.findOne({ id });
            if (!classe) return { error: "classe_not_found" };
            var timeline = classe.timeline;
            timeline = [...timeline, { name, description }];
            var newClasse = await classeModel.findByIdAndUpdate(id, { $set: { timeline }}, { new: true});
            return newClasse;
        } catch (err) {
            console.log(err)
            return { error: "internal_error" };
        }
    }

    async removeTimeline({id, timelineID}){
        try {
            const classe = await classeModel.findOne({ id });
            if (!classe) return { error: "classe_not_found" };
            var timeline = classe.timeline;
            timeline = timeline.filter(x => x._id != timelineID);
            var newClasse = await classeModel.findByIdAndUpdate(id, { $set: { timeline }}, { new: true});
            return newClasse;          
        } catch (err) {
            return { error: "internal_error" };
        }
    }

    async requestTimelineHash({id, timelineID}){
        try {
            const classe = await classeModel.findOne({ id });
            if (!classe) return { error: "classe_not_found" };
            var timeline = classe.timeline.find(x => x._id == timelineID);
            var index = classe.timeline.findIndex(x => x._id == timelineID);
            const start = Date.now();
            const end = (start + (60 * 60000));
            var access = {
                start: new Date(start),
                end: new Date(end)
            }
            var payload = {
                timeline,
                access,
                id
            }
            var token = jwt.sign(payload, process.env.TIMELINE);
            access.url = token;
            timeline.access = access;
            classe.timeline[index] = timeline;
            await classeModel.findByIdAndUpdate(id, { $set: { timeline: classe.timeline }}, { new: true});
            return { token };
        } catch (err) {
            return { error: "internal_error" };
        }
    }

    
}