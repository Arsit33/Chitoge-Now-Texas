/** @format */

import MessageHandler from "../../Handlers/MessageHandler";
import BaseCommand from "../../lib/BaseCommand";
import WAClient from "../../lib/WAClient";
import { ISimplifiedMessage } from "../../typings";
import { MessageType } from "@adiwajshing/baileys";

export default class Command extends BaseCommand {
	constructor(client: WAClient, handler: MessageHandler) {
		super(client, handler, {
			command: "info",
			description: "Will display the info of the bot",
			category: "general",
			usage: `${client.config.prefix}info`,
			baseXp: 0,
		});
	}

	run = async (M: ISimplifiedMessage): Promise<void> => {
		/*eslint-disable @typescript-eslint/no-explicit-any*/
		const chats: any = this.client.chats
			.all()
			.filter((v) => !v.read_only && !v.archive)
			.map((v) => v.jid)
			.map((jids) => (jids.includes("g.us") ? jids : null))
			.filter((v) => v);
		const pad = (s: any) => (s < 10 ? "0" : "") + s;
		const formatTime = (seconds: any) => {
			const hours = Math.floor(seconds / (60 * 60));
			const minutes = Math.floor((seconds % (60 * 60)) / 60);
			const secs = Math.floor(seconds % 60);
			return `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;
		};
                const texas =
			"https://telegra.ph/file/1c0170c930d5ab65bbcad.jpg";
		const uptime = () => formatTime(process.uptime());
		return void this.client.sendMessage(
			M.from,
			{ url: texas },
			MessageType.image,
			{
				caption: `*╭─* \n*│Name: Marika* ✨\n*│ℙ𝕣𝕖𝕗𝕚𝕩:* *${this.client.config.prefix}*\n*│Uptime: ${uptime()}*\n*│Total Groups: ${chats.length}*\n*│Owner: Arsit*\n*╰────────────*\n`
		        })
           };
}
