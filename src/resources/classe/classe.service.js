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

    async addTimeline({}){
        try {
            
        } catch (err) {
            return { error: "internal_error" };
        }
    }

    async removeTimeline({}){
        try {
            
        } catch (err) {
            return { error: "internal_error" };
        }
    }

    async requestTimelineHash({}){
        try {
            
        } catch (err) {
            return { error: "internal_error" };
        }
    }

    
}