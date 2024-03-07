import { handleRequest } from "../../app.js";
import Service from "./classe.service.js";

export default class Controller {
	service = new Service();
	
	requestTimelineHash = async (req, res) => handleRequest(req, res, this.service.requestTimelineHash);
	removeTimeline = async (req, res) => handleRequest(req, res, this.service.removeTimeline);
	createClasse = async (req, res) => handleRequest(req, res, this.service.createClasse);
	removeClasse = async (req, res) => handleRequest(req, res, this.service.removeClasse);
	addPresence = async (req, res) => handleRequest(req, res, this.service.addPresence);
	addTimeline = async (req, res) => handleRequest(req, res, this.service.addTimeline);
	getClasses = async (req, res) => handleRequest(req, res, this.service.getClasses);

}
