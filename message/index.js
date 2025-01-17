/* eslint-disable no-case-declarations */
/* eslint-disable no-unused-vars */
/* eslint-disable no-irregular-whitespace */

/**
 * This source code below is free, please DO NOT sell this in any form!
 * Source code ini gratis, jadi tolong JANGAN jual dalam bentuk apapun!
 *
 * If you copying one of our source code, please give us CREDITS. Because this is one of our hardwork.
 * Apabila kamu menjiplak salah satu source code ini, tolong berikan kami CREDIT. Karena ini adalah salah satu kerja keras kami.
 *
 * If you want to contributing to this source code, pull requests are always open.
 * Apabila kamu ingin berkontribusi ke source code ini, pull request selalu kami buka.
 *
 * Thanks for the contributions.
 * Terima kasih atas kontribusinya.
 */

/********** MODULES **********/
const { decryptMedia, Client } = require('@open-wa/wa-automate')
const fs = require('fs-extra')
const Nekos = require('nekos.life')
const neko = new Nekos()
const os = require('os')
const nhentai = require('nhentai-js')
const { API } = require('nhentai-api')
const api = new API()
const sagiri = require('sagiri')
const NanaAPI = require('nana-api')
const nana = new NanaAPI()
const fetch = require('node-fetch')
const isPorn = require('is-porn')
const exec = require('await-exec')
const ytdl = require('ytdl-core')
const ytsr = require('ytsr')
const kodepos = require('kodepos.js')
const config = require('../config.json')
const saus = sagiri(config.nao, { results: 5 })
const axios = require('axios')
const tts = require('node-gtts')
const nekobocc = require('nekobocc')
const ffmpeg = require('fluent-ffmpeg')
const bent = require('bent')
const path = require('path')
const ms = require('parse-ms')
const toMs = require('ms')
const instagramGetUrl = require("instagram-url-direct")
const canvas = require('canvacord')
const mathjs = require('mathjs')
const emojiUnicode = require('emoji-unicode')
const moment = require('moment-timezone')
const ocrtess = require('node-tesseract-ocr')
const translate = require('@vitalets/google-translate-api')
moment.tz.setDefault('Asia/Jakarta').locale('id')
const genshin = require('genshin')
const google = require('google-it')
const cron = require('node-cron')
/********** END OF MODULES **********/

/********** UTILS **********/
const { msgFilter, color, processTime, isUrl, createSerial } = require('../tools')
const { nsfw, weeaboo, downloader, fun, misc, toxic } = require('../lib')
const { uploadImages } = require('../tools/fetcher')
const { ind, eng } = require('./text/lang/')
const { daily, level, register, afk, reminder, premium, limit} = require('../function')
const cd = 4.32e+7
const limitCount = 25
const errorImg = 'https://i.ibb.co/jRCpLfn/user.png'
const dateNow = moment.tz('Asia/Jakarta').format('DD-MM-YYYY')
const ocrconf = {
    lang: 'eng',
    oem: '1',
    psm: '3'
}
/********** END OF UTILS **********/

/********** DATABASES **********/
const _nsfw = JSON.parse(fs.readFileSync('./database/group/nsfw.json'))
const _antilink = JSON.parse(fs.readFileSync('./database/group/antilink.json'))
const _antinsfw = JSON.parse(fs.readFileSync('./database/group/antinsfw.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/group/leveling.json'))
const _welcome = JSON.parse(fs.readFileSync('./database/group/welcome.json'))
const _autosticker = JSON.parse(fs.readFileSync('./database/group/autosticker.json'))
const _ban = JSON.parse(fs.readFileSync('./database/bot/banned.json'))
const _premium = JSON.parse(fs.readFileSync('./database/bot/premium.json'))
const _mute = JSON.parse(fs.readFileSync('./database/bot/mute.json'))
const _registered = JSON.parse(fs.readFileSync('./database/bot/registered.json'))
const _level = JSON.parse(fs.readFileSync('./database/user/level.json'))
let _limit = JSON.parse(fs.readFileSync('./database/user/limit.json'))
const _afk = JSON.parse(fs.readFileSync('./database/user/afk.json'))
const _reminder = JSON.parse(fs.readFileSync('./database/user/reminder.json'))
const _daily = JSON.parse(fs.readFileSync('./database/user/daily.json'))
const _stick = JSON.parse(fs.readFileSync('./database/bot/sticker.json'))
const _setting = JSON.parse(fs.readFileSync('./database/bot/setting.json'))
let { memberLimit, groupLimit } = _setting
/********** END OF DATABASES **********/

/********** MESSAGE HANDLER **********/
// eslint-disable-next-line no-undef
module.exports = msgHandler = async (bocchi = new Client(), message) => {
    try {
        const { type, id, fromMe, from, t, sender, buttons, selectedButtonId, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, chatId, mentionedJidList, author } = message
        let { body } = message
        const { name, formattedTitle } = chat
        let { pushname, verifiedName, formattedName } = sender
        pushname = pushname || verifiedName || formattedName
        const botNumber = await bocchi.getHostNumber() + '@c.us'
        const blockNumber = await bocchi.getBlockedIds()
        const ownerNumber = config.ownerBot
        const authorWm = config.authorStick
        const packWm = config.packStick
        const groupId = isGroupMsg ? chat.groupMetadata.id : ''
        const groupAdmins = isGroupMsg ? await bocchi.getGroupAdmins(groupId) : ''
        const time = moment(t * 1000).format('DD/MM/YY HH:mm:ss')

        const cmd = caption || body || ''
        const command = cmd.toLowerCase().split(' ')[0] || ''
        const prefix = /^[°•π÷×¶∆£¢€¥®™✓=|~!#$%^&.\\©^]/.test(command) ? command.match(/^[°•π÷×¶∆£¢€¥®™✓=|~!#$%^&.\\©^]/gi) : '-' // Multi-Prefix by: VideFrelan
        const chats = (type === 'chat') ? body : ((type === 'image' || type === 'video')) ? caption : ''
        body = (type === 'chat' && body.startsWith(prefix)) ? body : (((type === 'image' || type === 'video' || type === 'buttons_response') && caption) && caption.startsWith(prefix)) ? caption : ''
        const args = body.trim().split(/ +/).slice(1)
        const uaOverride = config.uaOverride
        const q = args.join(' ')
        const ar = args.map((v) => v.toLowerCase())
	const arg = body.substring(body.indexOf(' ') + 0)
        const url = args.length !== 0 ? args[0] : ''
	const sleeput = async (ms) => {
		return new Promise(resolve => setTimeout(resolve, ms));
		}

        /********** VALIDATOR **********/
        const isCmd = body.startsWith(prefix)
        const isBlocked = blockNumber.includes(sender.id)
        const isOwner = sender.id === ownerNumber
        const isBanned = _ban.includes(sender.id)
        const isPremium = premium.checkPremiumUser(sender.id, _premium)
        const isRegistered = register.checkRegisteredUser(sender.id, _registered)
        const isGroupAdmins = isGroupMsg ? groupAdmins.includes(sender.id) : false
        const isBotGroupAdmins = isGroupMsg ? groupAdmins.includes(botNumber) : false
        const isNsfw = isGroupMsg ? _nsfw.includes(groupId) : false
        const isWelcomeOn = isGroupMsg ? _welcome.includes(groupId) : false
        const isDetectorOn = isGroupMsg ? _antilink.includes(groupId) : false
        const isLevelingOn = isGroupMsg ? _leveling.includes(groupId) : false
        const isAutoStickerOn = isGroupMsg ? _autosticker.includes(groupId) : false
        const isAntiNsfw = isGroupMsg ? _antinsfw.includes(groupId) : false
        const isMute = isGroupMsg ? _mute.includes(chat.id) : false
        const isAfkOn = isGroupMsg ? afk.checkAfkUser(sender.id, _afk) : false
        const isQuotedImage = quotedMsg && quotedMsg.type === 'image'
        const isQuotedVideo = quotedMsg && quotedMsg.type === 'video'
        const isQuotedSticker = quotedMsg && quotedMsg.type === 'sticker'
        const isQuotedGif = quotedMsg && quotedMsg.mimetype === 'image/gif'
        const isQuotedAudio = quotedMsg && quotedMsg.type === 'audio'
        const isQuotedVoice = quotedMsg && quotedMsg.type === 'ptt'
        const isImage = type === 'image'
        const isVideo = type === 'video'
        const isAudio = type === 'audio'
        const isVoice = type === 'ptt'
        const isGif = mimetype === 'image/gif'
        /********** END OF VALIDATOR **********/

        // Automate
        premium.expiredCheck(_premium)
        cron.schedule('0 0 * * *', () => {
            const reset = []
            _limit = reset
            console.log('Hang tight, it\'s time to reset usage limits...')
            fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
            console.log('Success!')
        }, {
            scheduled: true,
            timezone: 'Asia/Jakarta'
        })

            // ROLE (Change to what you want, or add) and you can change the role sort based on XP.
            const levelRole = level.getLevelingLevel(sender.id, _level)
            var role = 'Copper V'
            if (levelRole >= 5){
                role = 'Copper IV'
            } 
            if (levelRole >= 10){
                role = 'Copper III'
            } 
            if (levelRole >= 15){
                role = 'Copper II'
            } 
            if (levelRole >= 20){
                role = 'Copper I'
            } 
            if (levelRole >= 25) {
                role = 'Silver V'
            } 
            if (levelRole >= 30) {
                role = 'Silver IV'
            } 
            if (levelRole >= 35) {
                role = 'Silver III'
            } 
            if (levelRole >= 40) {
                role = 'Silver II'
            } 
            if (levelRole >= 45) {
                role = 'Silver I'
            } 
            if (levelRole >= 50) {
                role = 'Gold V'
            } 
            if (levelRole >= 55) {
                role = 'Gold IV'
            } 
            if (levelRole >= 60) {
                role = 'Gold III'
            } 
            if (levelRole >= 65) {
                role = 'Gold II'
            } 
            if (levelRole >= 70) {
                role = 'Gold I'
            } 
            if (levelRole >= 75) {
                role = 'Platinum V'
            } 
            if (levelRole >= 80) {
                role = 'Platinum IV'
            } 
            if (levelRole >= 85) {
                role = 'Platinum III'
            } 
            if (levelRole >= 90) {
                role = 'Platinum II'
            } 
            if (levelRole >= 95) {
                role = 'Platinum I'
            } 
            if (levelRole >= 100) {
                role = 'Exterminator'
            } 

        // Leveling [BETA] by Slavyan
        if (isGroupMsg && isRegistered && !level.isGained(sender.id) && !isBanned && isLevelingOn) {
            try {
                level.addCooldown(sender.id)
                const currentLevel = level.getLevelingLevel(sender.id, _level)
                const amountXp = Math.floor(Math.random() * (15 - 25 + 1) + 15)
                const requiredXp = 5 * Math.pow(currentLevel, 2) + 50 * currentLevel + 100
                level.addLevelingXp(sender.id, amountXp, _level)
                if (requiredXp <= level.getLevelingXp(sender.id, _level)) {
                    level.addLevelingLevel(sender.id, 1, _level)
                    const userLevel = level.getLevelingLevel(sender.id, _level)
                    const fetchXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                    await bocchi.reply(from, `*── 「 LEVEL UP 」 ──*\n\n➸ *Name*: ${pushname}\n➸ *XP*: ${level.getLevelingXp(sender.id, _level)} / ${fetchXp}\n➸ *Level*: ${currentLevel} -> ${level.getLevelingLevel(sender.id, _level)} 🆙 \n➸ *Role*: *${role}*`, id)
                }
            } catch (err) {
                console.error(err)
            }
        }

//Auto Reply Grup
		if (isGroupMsg ) {
            if (chats.match(new RegExp(/(kucing)/))) {
                    await bocchi.sendPtt(from, './media/kucing.ogg', id)     
            }else if (chats.match(new RegExp(/(katakan)/))) {
                    await bocchi.sendPtt(from, './media/katakan.ogg', id)     
            }else if (chats.match(new RegExp(/(untuk apa)/))) {
                    await bocchi.sendPtt(from, './media/untuk.ogg', id)     
            }else if (chats.match(new RegExp(/(haha)/))) {
                    await bocchi.sendPtt(from, './media/wkwk.ogg', id)     
            }else if (chats.match(new RegExp(/(haha)/))) {
                    await bocchi.sendPtt(from, './media/wkwk.ogg', id)     
            }else if (chats.match(new RegExp(/(wkwk)/))) {
                    await bocchi.sendPtt(from, './media/hai.mp3', id)     
            }else if (chats.match(new RegExp(/(lol)/))) {
                    await bocchi.sendPtt(from, './media/hai.mp3', id)     
            }else if (chats.match(new RegExp(/(assalamualaikum)/))) {
                    await bocchi.sendPtt(from, './media/wa.ogg', id)     
            }else if (chats.match(new RegExp(/(del)/))) {
					await bocchi.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            }else if (chats.match(new RegExp(/(Del)/))) {
					await bocchi.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
            }else if (chats.match(new RegExp(/(del)/))) {
					await bocchi.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
	    }else if (chats.match(new RegExp(/(bantu)/))) {
                    await bocchi.sendPtt(from, './media/bantu.ogg', id)     
            }else if (chats.match(new RegExp(/(Assalamualaikum)/))) {
                    await bocchi.sendPtt(from, './media/waalaikumssalam.ogg', id)     
        }
        }	
        // Anti group link detector
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.whatsapp.com)/gi))) {
                const valid = await bocchi.inviteInfo(chats)
                if (valid) {
                    console.log(color('[KICK]', 'red'), color('Received a group link and it is a valid link!', 'yellow'))
                    await bocchi.reply(from, eng.linkDetected(), id)
                    await bocchi.removeParticipant(groupId, sender.id)
                } else {
                    console.log(color('[WARN]', 'yellow'), color('Received a group link but it is not a valid link!', 'yellow'))
                }
            }
        }
        
        // Example response button (if you have license key)
        if (message.type === 'buttons_response') {
        if (message.selectedButtonId === 'menu') {
        	await bocchi.sendText(from, eng.menu(jumlahUser, levelMenu, xpMenu, role, pushname, reqXpMenu, isPremium ? 'YES' : 'NO'))
        }
        }

        // Anti virtext by: @VideFrelan
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && !isOwner) {
           if (chats.length > 5000) {
               await bocchi.sendTextWithMentions(from, `@${sender.id} is detected sending a virtext.\nYou will be kicked!`)
               await bocchi.removeParticipant(groupId, sender.id)
            }
        } 
               
        // Sticker keywords by: @hardianto02_
        if (isGroupMsg && isRegistered) {
            if (_stick.includes(chats)) {
                await bocchi.sendImageAsSticker(from, `./temp/sticker/${chats}.webp`, { author: authorWm, pack: packWm })
            }
        }

        // Anti fake group link detector by: Baguettou
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isDetectorOn && !isOwner) {
            if (chats.match(new RegExp(/(https:\/\/chat.(?!whatsapp.com))/gi))) {
                console.log(color('[KICK]', 'red'), color('Received a fake group link!', 'yellow'))
                await bocchi.reply(from, 'Fake group link detected!', id)
                await bocchi.removeParticipant(groupId, sender.id)
            }
        }

        // Anti NSFW link
        if (isGroupMsg && !isGroupAdmins && isBotGroupAdmins && isAntiNsfw && !isOwner) {
            if (isUrl(chats)) {
                const classify = new URL(isUrl(chats))
                console.log(color('[FILTER]', 'yellow'), 'Checking link:', classify.hostname)
                isPorn(classify.hostname, async (err, status) => {
                    if (err) return console.error(err)
                    if (status) {
                        console.log(color('[NSFW]', 'red'), color('The link is classified as NSFW!', 'yellow'))
                        await bocchi.reply(from, eng.linkNsfw(), id)
                        await bocchi.removeParticipant(groupId, sender.id)
                    } else {
                        console.log(('[NEUTRAL]'), color('The link is safe!'))
                    }
                })
            }
        }

        // Auto sticker
        if (isGroupMsg && isAutoStickerOn && isMedia && isImage && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await bocchi.sendImageAsSticker(from, imageBase64, { author: authorWm, pack: packWm })
            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
        }

        // Auto sticker video
        if (isGroupMsg && isAutoStickerOn && isMedia && isVideo && !isCmd) {
            const mediaData = await decryptMedia(message, uaOverride)
            const videoBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
            await bocchi.sendMp4AsSticker(from, videoBase64, { stickerMetadata: true, pack: packWm, author: authorWm, fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', crop: false, loop: 0 })
            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
        }

        // AFK by Slavyan
        if (isGroupMsg) {
            for (let ment of mentionedJidList) {
                if (afk.checkAfkUser(ment, _afk)) {
                    const getId = afk.getAfkId(ment, _afk)
                    const getReason = afk.getAfkReason(getId, _afk)
                    const getTime = afk.getAfkTime(getId, _afk)
                    await bocchi.reply(from, eng.afkMentioned(getReason, getTime), id)
                }
            }
            if (afk.checkAfkUser(sender.id, _afk) && !isCmd) {
                _afk.splice(afk.getAfkPosition(sender.id, _afk), 1)
                fs.writeFileSync('./database/user/afk.json', JSON.stringify(_afk))
                await bocchi.sendText(from, eng.afkDone(pushname))
            }
        }

        // Mute
        if (isCmd && isMute && !isGroupAdmins && !isOwner && !isPremium) return
        
        // Ignore banned and blocked users
        if (isCmd && (isBanned || isBlocked) && !isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && (isBanned || isBlocked) && isGroupMsg) return console.log(color('[BAN]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Anti spam
        if (isCmd && msgFilter.isFiltered(from) && !isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
        if (isCmd && msgFilter.isFiltered(from) && isGroupMsg) return console.log(color('[SPAM]', 'red'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))

        // Log
        if (isCmd && !isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname))
            await bocchi.sendSeen(from)
        }
        if (isCmd && isGroupMsg) {
            console.log(color('[CMD]'), color(time, 'yellow'), color(`${command} [${args.length}]`), 'from', color(pushname), 'in', color(name || formattedTitle))
            await bocchi.sendSeen(from)
        }
        
        // Anti spam
        if (isCmd && !isPremium && !isOwner) msgFilter.addFilter(from)

        switch (command) {
            case prefix+'antiporn': // Premium, chat VideFikri
                await bocchi.reply(from, 'Premium feature!\n\nContact: wa.me/6285692655520?text=Buy%20Anti%20Porn', id)
            break

            // Register by Slavyan
            case prefix+'register':
                if (isRegistered) return await bocchi.reply(from, eng.registeredAlready(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                const namaUser = q.substring(0, q.indexOf('|') - 1)
                const umurUser = q.substring(q.lastIndexOf('|') + 2)
                const serialUser = createSerial(20)
                if (Number(umurUser) >= 40) return await bocchi.reply(from, eng.ageOld(), id)
                register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
                await bocchi.reply(from, eng.registered(namaUser, umurUser, sender.id, time, serialUser), id)
                console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
            break

            // Level [BETA] by Slavyan
            case prefix+'level':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isLevelingOn) return await bocchi.reply(from, eng.levelingNotOn(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                const userLevel = level.getLevelingLevel(sender.id, _level)
                const userXp = level.getLevelingXp(sender.id, _level)
                const ppLink = await bocchi.getProfilePicFromServer(sender.id)
                if (ppLink === undefined) {
                    var pepe = errorImg
                } else {
                    pepe = ppLink
                }
                const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
                const rank = new canvas.Rank()
                    .setAvatar(pepe)
                    .setLevel(userLevel)
                    .setLevelColor('#ffa200', '#ffa200')
                    .setRank(Number(level.getUserRank(sender.id, _level)))
                    .setCurrentXP(userXp)
                    .setOverlay('#000000', 100, false)
                    .setRequiredXP(requiredXp)
                    .setProgressBar('#ffa200', 'COLOR')
                    .setBackground('COLOR', '#000000')
                    .setUsername(pushname)
                    .setDiscriminator(sender.id.substring(6, 10))
                rank.build()
                    .then(async (buffer) => {
                        const imageBase64 = `data:image/png;base64,${buffer.toString('base64')}`
                        await bocchi.sendImage(from, imageBase64, 'rank.png', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'leaderboard':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isLevelingOn) return await bocchi.reply(from, eng.levelingNotOn(), id)
                if (!isGroupMsg) return await bocchi.reply(from. eng.groupOnly(), id)
                const resp = _level
                _level.sort((a, b) => (a.xp < b.xp) ? 1 : -1)
                let leaderboard = '*── 「 LEADERBOARDS 」 ──*\n\n'
                try {
                    for (let i = 0; i < 10; i++) {
                        var roles = 'Copper V'
                        if (resp[i].level >= 5) {
                            roles = 'Copper IV'
                        } 
                         if (resp[i].level >= 10) {
                            roles = 'Copper III'
                        } 
                         if (resp[i].level >= 15) {
                            roles = 'Copper II'
                        } 
                         if (resp[i].level >= 20) {
                            roles = 'Copper I'
                        } 
                         if (resp[i].level >= 25) {
                            roles = 'Silver V'
                        } 
                         if (resp[i].level >= 30) {
                            roles = 'Silver IV'
                        } 
                         if (resp[i].level >= 35) {
                            roles = 'Silver III'
                        } 
                         if (resp[i].level >= 40) {
                            roles = 'Silver II'
                        } 
                         if (resp[i].level >= 45) {
                            roles = 'Silver I'
                        } 
                         if (resp[i].level >= 50) {
                            roles = 'Gold V'
                        } 
                         if (resp[i].level >= 55) {
                            roles = 'Gold IV'
                        } 
                         if (resp[i].level >= 60) {
                            roles = 'Gold III'
                        } 
                         if (resp[i].level >= 65) {
                            roles = 'Gold II'
                        } 
                         if (resp[i].level >= 70) {
                            roles = 'Gold I'
                        } 
                         if (resp[i].level >= 75) {
                            roles = 'Platinum V'
                        } 
                         if (resp[i].level >= 80) {
                            roles = 'Platinum IV'
                        } 
                         if (resp[i].level >= 85) {
                            roles = 'Platinum III'
                        } 
                         if (resp[i].level >= 90) {
                            roles = 'Platinum II'
                        } 
                         if (resp[i].level >= 95) {
                            roles = 'Platinum I'
                        } 
                         if (resp[i].level > 100) {
                            roles = 'Exterminator'
                        }
                        leaderboard += `${i + 1}. wa.me/${_level[i].id.replace('@c.us', '')}\n➸ *XP*: ${_level[i].xp} *Level*: ${_level[i].level}\n➸ *Role*: ${roles}\n\n`
                    }
                    await bocchi.reply(from, leaderboard, id)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, eng.minimalDb(), id)
                }
            break

            // Misc
            case prefix+'ocr': // by: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage || isQuotedSticker) {
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage || isQuotedSticker ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    fs.writeFileSync(`./temp/${sender.id}.jpg`, mediaData)
                    ocrtess.recognize(`./temp/${sender.id}.jpg`, ocrconf)
                        .then(async (text) => {
                            await bocchi.reply(from, `*...:* *OCR RESULT* *:...*\n\n${text}`, id)
                            fs.unlinkSync(`./temp/${sender.id}.jpg`)
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'google': // chika-chantekkzz
            case prefix+'googlesearch':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                google({ 'query': q, 'no-display': true })
                    .then(async (results) => {
                        let txt = `*── 「 GOOGLE SEARCH 」 ──*\n\n*by: bocchi*\n\n_*Search results for: ${q}*_`
                        for (let i = 0; i < results.length; i++) {
                            txt += `\n\n➸ *Title*: ${results[i].title}\n➸ *Desc*: ${results[i].snippet}\n➸ *Link*: ${results[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, txt, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'say':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.sendText(from, q)
            break
            case prefix+'afk': // by Slavyan
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (isAfkOn) return await bocchi.reply(from, eng.afkOnAlready(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const reason = q ? q : 'Nothing.'
                afk.addAfkUser(sender.id, time, reason, _afk)
                await bocchi.reply(from, eng.afkOn(pushname, reason), id)
            break
            case prefix+'shortlink':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isUrl(url)) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const urlShort = await misc.shortener(url)
                await bocchi.reply(from, eng.wait(), id)
                await bocchi.reply(from, urlShort, id)
                console.log('Success!')
            break
           
            case prefix+'jadwalsholat':
            case prefix+'jadwalsolat':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                await bocchi.reply(from, eng.wait(), id)
                misc.jadwalSholat(q)
                    .then((data) => {
                        data.map(async ({isya, subuh, dzuhur, ashar, maghrib, terbit}) => {
                            const x = subuh.split(':')
                            const y = terbit.split(':')
                            const xy = x[0] - y[0]
                            const yx = x[1] - y[1]
                            const perbandingan = `${xy < 0 ? Math.abs(xy) : xy} jam ${yx < 0 ? Math.abs(yx) : yx} menit`
                            const msg = `Jadwal sholat untuk ${q} dan sekitarnya ( *${dateNow}* )\n\nDzuhur: ${dzuhur}\nAshar: ${ashar}\nMaghrib: ${maghrib}\nIsya: ${isya}\nSubuh: ${subuh}\n\nDiperkirakan matahari akan terbit pada pukul ${terbit} dengan jeda dari subuh sekitar ${perbandingan}`
                            await bocchi.reply(from, msg, id)
                            console.log('Success sending jadwal sholat!')
                        })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'tts':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const speech = q.substring(q.indexOf('|') + 2)
                const ptt = tts(ar[0])
                try {
                    ptt.save(`${speech}.mp3`, speech, async () => {
                        await bocchi.sendPtt(from, `${speech}.mp3`, id)
                        fs.unlinkSync(`${speech}.mp3`)
                    })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case prefix+'tomp3': // by: Piyobot
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isVideo || isQuotedVideo) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedVideo ? quotedMsg : message
                    const _mimetype = isQuotedVideo ? quotedMsg.mimetype : mimetype
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, 'video', `${name}.${_mimetype.replace(/.+\//, '')}`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await bocchi.sendFile(from, fileOutputPath, 'audio.mp3', '', id)
                                console.log(color('[WAPI]', 'green'), 'Success sending mp3!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'toptt':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isAudio || isQuotedAudio) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedAudio ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const name = new Date() * 1
                    fs.writeFileSync(`./temp/audio/${name}.mp3`, mediaData)
                    await bocchi.sendPtt(from, `./temp/audio/${name}.mp3`, id)
                    fs.unlinkSync(`./temp/audio/${name}.mp3`)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'math':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (typeof mathjs.evaluate(q) !== 'number') {
                    await bocchi.reply(from, eng.notNum(q), id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, `*── 「 MATH 」 ──*\n\n${q} = ${mathjs.evaluate(q)}`, id)
                }
            break
            case prefix+'mutual':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) return await bocchi.reply(from, 'Command ini tidak bisa digunakan di dalam grup!', id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, 'Looking for a partner...', id)
                await bocchi.sendContact(from, register.getRegisteredRandomId(_registered))
                await bocchi.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case prefix+'next':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) return await bocchi.reply(from, 'Command ini tidak bisa digunakan di dalam grup!', id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, 'Looking for a partner...', id)
                await bocchi.sendContact(from, register.getRegisteredRandomId(_registered))
                await bocchi.sendText(from, `Partner found: 🙉\n*${prefix}next* — find a new partner`)
            break
            case prefix+'tafsir':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (args.length === 0) return bocchi.reply(from, `Untuk menampilkan ayat Al-Qur'an tertentu beserta tafsir dan terjemahannya\ngunakan ${prefix}tafsir surah ayat\n\nContoh: ${prefix}tafsir Al-Mulk 10`, id)
                await bocchi.reply(from, eng.wait(), id)
                const responSurah = await axios.get('https://raw.githubusercontent.com/VideFrelan/words/main/tafsir.txt')
                const { data } = responSurah.data
                const idx = data.findIndex((post) => {
                    if ((post.name.transliteration.id.toLowerCase() === args[0].toLowerCase()) || (post.name.transliteration.en.toLowerCase() === args[0].toLowerCase())) return true
                })
                const nomerSurah = data[idx].number
                if (!isNaN(nomerSurah)) {
                    const responseh = await axios.get('https://api.quran.sutanlab.id/surah/'+ nomerSurah + '/'+ args[1])
                    const { data } = responseh.data
                    let pesan = ''
                    pesan += 'Tafsir Q.S. ' + data.surah.name.transliteration.id + ':' + args[1] + '\n\n'
                    pesan += data.text.arab + '\n\n'
                    pesan += '_' + data.translation.id + '_\n\n' + data.tafsir.id.long
                    await bocchi.reply(from, pesan, id)
                }
            break
            case prefix+'listsurah':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                await bocchi.reply(from, eng.wait(), id)
                misc.listSurah()
                    .then(async ({ result }) => {
                        let list = '*── 「 AL-QUR\'AN 」 ──*\n\n'
                        for (let i = 0; i < result.list.length; i++) {
                            list += `${result.list[i]}\n\n`
                        }
                        await bocchi.reply(from, list, id)
                        console.log('Success sending Al-Qur\'an list!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'surah':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                await bocchi.reply(from, eng.wait(), id)
                misc.getSurah(args[0])
                    .then(async ({ result }) => {
                        await bocchi.reply(from, `${result.surah}\n\n${result.quran}`, id)
                        console.log('Success sending surah!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
			case prefix+'kodepos':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                await bocchi.reply(from, eng.wait(), id)
                const queryq = q;
const limitasi = 10;
const exact = false; // Should match query? if false, LIKE (similar in SQL) method is used.

const search = kodepos.search(queryq, limitasi, exact);
console.log(search);
for (let i = 0; i < 10; i++) {
bocchi.sendText(from,  '➸ Provinsi : ' + `${search.results[i].province}` +'\n➸ Kota : ' + `${search.results[i].city}` +'\n➸ Kecamatan : ' + `${search.results[i].district}` +'\n➸ Desa :' + `${search.results[i].urban}` +'\n➸ Kode Pos :' + `${search.results[i].postal_code}` +'' , id)                    
}
            break
            case prefix+'song':
            case prefix+'play':
				if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
				if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                if (args.length == 0) return bocchi.reply(from, `Fortmat salah \nUsage: ${prefix}play judul lagu`, id)
				const playOptions = {
					limit: 1,
					gl: 'ID',
					hl: 'pt'
				}
				const res = await ytsr(q, playOptions).catch(err => {
					return bocchi.reply(from, `Gk ketemu 😔\nNot Found!` , id)
				})

				const videoResult = res.items.filter(item => item.type === 'video')[0]

				if (!videoResult) {
					return bocchi.reply(from, `gk ketemu 😔`, id)
				}

				const playInfo = await ytdl.getInfo(videoResult.url, {
					quality: 'highestaudio'
				});

				let playStream = ytdl(videoResult.url, {
					quality: 'highestaudio'
				});

				let songPlayInfo = {
					title: playInfo.videoDetails.title,
					url: playInfo.videoDetails.video_url,
					lengthSeconds: playInfo.videoDetails.lengthSeconds,
					authorName: playInfo.videoDetails.author.name,
					videoId: playInfo.videoDetails.videoId,
					isPrivate: playInfo.videoDetails.isPrivate,
				}
		const durase = `${songPlayInfo.lengthSeconds}/60`
				console.log(durase)
				bocchi.sendFileFromUrl(from, videoResult.bestThumbnail.url, 'yt.jpg', `\n╔═══╗♪${songPlayInfo.title.replace('Official','').replace('Unofficial','').replace('Cover','').replace('Video','').replace('Clip','').replace('|','').replace('Music','').replace('UNOFFICIAL','').replace('OFFICIAL','').replace('MUSIC','').replace('VIDEO','').replace('(','').replace(')','').replace('lirik','').replace('Lyric','').replace('Lirik','')}\n║███║♫ 0:00 ❍─────── -3.29\n║   (●)   ║♫	      ↻     ⊲  Ⅱ  ⊳     ↺\n╚═══╝♪ VOLUME: ▁▂▃▄▅▆▇ 100%`, id)

				//console.log(songinfo);
				let testPlaySize = (((songPlayInfo.lengthSeconds * 128000) / 8) / 1024) / 1024
				console.log(`Ukuran viddeo : ${testPlaySize} MB`);

				if (testPlaySize >= 15) {
					return bocchi.reply(from, `Kegedean bos maksimal file 15MB ✋😥`, id)
				}

				if (songPlayInfo.lengthSeconds > 900) {
					return bocchi.reply(from, `Kepanjangan bos maksimal 900 detik ✋😥`, id)
				}

				ffmpeg(playStream)
					.audioBitrate(128)
					.save(`./temp/${songPlayInfo.videoId}.mp3`)
					.on('end', () => {
						var playStats = fs.statSync(`./temp/${songPlayInfo.videoId}.mp3`)
						let realSize = playStats.size / (1024 * 1024);
						console.log(`ukuran asli: ${realSize} MB`);
						if (realSize <= 15) {
							bocchi.sendFile(from, `./temp/${songPlayInfo.videoId}.mp3`, `${songPlayInfo.videoId}.mp3`, null, id).then(f => {
								try {
									fs.unlinkSync(`./temp/${songPlayInfo.videoId}.mp3`);
									console.log(`successfully deleted ${songPlayInfo.videoId}.mp3`);
								} catch (err) {
									// handle the error
									console.log(err);
								}
							})
						} else {
							return bocchi.reply(from, `Gk ada lagunya pak ✋😥`, id)
						}
					});
				break
				// module
				//const ytdl = require('ytdl-core')
				//const ytsr = require('ytsr')
				
				case prefix+'playvideo':
				case prefix+'ytmp4':
			    if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return bocchi.reply(from, `Cara Pakek : *${prefix}playvideo* Judul nye`, id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id) 
				const resa = await ytsr(body.slice(6)).catch(err => {
					return bocchi.reply(from, `Gk ketemu 😔`, id)
				})
				const videoDatas = resa.items.filter(item => item.type === 'video')[0];
				//console.log(videoDatas)
				console.log(videoDatas.url)
				var viidio = videoDatas.url.replace('https://m.youtu.be/', '').replace('https://youtu.be/', '').replace('https://www.youtube.com/', '').replace('watch?v=', '')
                let info = await ytdl.getInfo(viidio);
				let format = ytdl.chooseFormat(info.formats, { quality: '18' });
				//console.log('Format found!', format)
				if (format.contentLength >= 100000000) {
						return bocchi.reply(from, `maksimal video 100MB`, id)
					} else {
				await sleeput(21000)
				await bocchi.sendFileFromUrl(from, format.url, `${videoDatas.title}.mp4`, '➸ *Title*: '+ `${videoDatas.title}` +'\n➸ *Channel* : ' + `${videoDatas.author.name}` + '\n➸ *Uploaded* : ' + `${videoDatas.uploadedAt}` +'\n➸ *Link* : ' + `${videoDatas.url}` + '')
					}
				console.log('succes')
				break
			case prefix+'gdrive':
            if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
			if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)	
			await bocchi.reply(from, eng.wait(), id)
				const regex = new RegExp("\/d\/(.+)\/", 'gi')
            if (!args[1].match(regex)) { await bocchi.reply(from, `Url Google Drive Yang Kamu Masukkan Salah!\nContoh : /gdrive https://drive.google.com/file/d/1Cd8KjB9-cUU_Jy8Q/view`, id) }
                const urla = args[1]
                const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
                function niceBytes(x){
                    let l = 0, n = parseInt(x, 10) || 0;
                    while(n >= 1024 && ++l){
                        n = n/1024;
                    }
                    return(n.toFixed(n < 10 && l > 0 ? 1 : 0) + ' ' + units[l]);
                }
                const m = urla.match(regex)
                const fileid = m.toString().trimStart('/', 'd').trim('/');
                const linke = 'https://drive.google.com/file' + fileid + 'view?usp=sharing'
                fetch('https://gdbypass.host/api/?link='+linke)
                    .then((res) => {
                        status = res.status
                        return res.json()
                    })
                    .then(async(body) => {
                        const fileName = body.data.Filename
                        const size = body.data.Filesize
                        const newLink = body.data.NewUnlimitedURL
                        const ling = await urlShortener(newLink)
                            bocchi.reply(from, `*「 GOOGLE DRIVE 」*\n\n• *Nama File :* ${fileName}\n*• File Size :* ${niceBytes(size)}\n*• Short Link :* ${ling}`, id)
                    })
                    .catch((err) => {
                        bocchi.reply(from, `Maaf, Sepertinya Link Tidak Berhasil Di Bypass\n` + err, id)
                    })
            break
			case prefix+'fb':
			case prefix+'facebook':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
				const fbDownloader = require("fb-downloader-scrapper")
let response = await fbDownloader(q)
console.log(response)
await bocchi.sendFileFromUrl(from, response.download[0].url, 'ig.mp4','➸ Quality : ' + `${response.download[0].quality}` +'',id)
            break
			case prefix+'ig':
			case prefix+'igdl':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
				 if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                if (!url.includes('instagram')) return await bocchi.reply(from, 'apa sih gaje', id)    
				await bocchi.reply(from, eng.wait(), id)
				let links = await instagramGetUrl(q)
				//console.log(links)
				await bocchi.sendFileFromUrl(from, links.url_list[0], 'ig.mp4',null,id)
                console.log('dah lah')    
            break
			case prefix+'igs':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)  
				if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)                            
				await bocchi.reply(from, eng.wait(), id)
				const apalo = {
								method: 'GET',
								url: 'https://instagram-scraper-2022.p.rapidapi.com/ig/search/',
								params: {user: q},
								headers: {
								'X-RapidAPI-Key': '7f7be4956emsh0d4a118e0f0d9d5p1afad4jsn4884474174f8',
								'X-RapidAPI-Host': 'instagram-scraper-2022.p.rapidapi.com'
									}
									};

				axios.request(apalo).then(function (response) {
				console.log(response.data);
				for (let i = 0; i < 3; i++) {
				const privat = response.data.users[i].user.is_private ? 'Yes' : 'No'
                bocchi.sendFileFromUrl(from, response.data.users[i].user.profile_pic_url, `${response.data.users[i].user.username}.jpg`, '➸ Username : ' + `${response.data.users[i].user.username}` +'\n➸ Nama : ' + `${response.data.users[i].user.full_name}` +'\n➸ Akun Privat : ' + `${privat}` +'\n➸ Link : https://intagram.com/'+ `${response.data.user[i].users.username}` +'' , id)                    
                            }
				}).catch(function (error) {
				console.error(error);
				bocchi.sendText(from, error, id)
				});
			break
			case prefix+'igstalk':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)  
				if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)    
				await bocchi.reply(from, eng.wait(), id)
			const gangme = {
							method: 'GET',
							url: 'https://instagram-scraper-2022.p.rapidapi.com/ig/info_username/',
							params: {user: q},
							headers: {
							'X-RapidAPI-Key': '7f7be4956emsh0d4a118e0f0d9d5p1afad4jsn4884474174f8',
							'X-RapidAPI-Host': 'instagram-scraper-2022.p.rapidapi.com'
								}
								};

			axios.request(gangme).then(function (response) {
			console.log(response.data);
			const privat = response.data.user.is_private ? 'Yes' : 'No'
			bocchi.sendFileFromUrl(from, response.data.user.hd_profile_pic_url_info.url, 'apa.jpg', '➸ Bio : ' + `${response.data.user.biography}` +'\n➸ Username : ' + `${response.data.user.username}` +'\n➸ Nama : ' + `${response.data.user.full_name}` +'\n➸ Follower : ' + `${response.data.user.follower_count}` +'\n➸ Following : ' + `${response.data.user.following_count}` +'\n➸ Akun Privat : ' + `${privat}` +'',id)
			}).catch(function (error) {
			console.error(error);
			bocchi.sendText(from,error, id)
			});
			break
			case prefix+'tiktok':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)  
				if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)    
				await bocchi.reply(from, eng.wait(), id)
			const tiktiktod = {
								method: 'GET',
								url: 'https://tiktok-video-no-watermark2.p.rapidapi.com/',
								params: {url: q, hd: '0'},
								headers: {
											'X-RapidAPI-Key': '7f7be4956emsh0d4a118e0f0d9d5p1afad4jsn4884474174f8',
											'X-RapidAPI-Host': 'tiktok-video-no-watermark2.p.rapidapi.com'
										}
								};

			axios.request(tiktiktod).then(function (response) {
			console.log(response.data);
			bocchi.sendFileFromUrl(from, response.data.data.play, 'apa.mp4', '➸ Title : ' + `${response.data.data.title}` +'\n➸ Author : ' + `@${response.data.data.author.unique_id}` +'\n➸ Nama : ' + `${response.data.data.author.nickname}` +'\n➸ Viewed : ' + `${response.data.data.play_count} Times` +'',id)
			}).catch(function (error) {
			console.error(error);
			bocchi.sendText(from,error,id)
			});
			break
			case prefix+'chekoperator':
			case prefix+'cekoperator':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)  
				if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)    
				await bocchi.reply(from, eng.wait(), id)
				const options = {
								method: 'GET',
								url: 'https://cek-operator-indonesia1.p.rapidapi.com/cek/'+q+'',
								headers: {
											'X-RapidAPI-Key': '7f7be4956emsh0d4a118e0f0d9d5p1afad4jsn4884474174f8',
											'X-RapidAPI-Host': 'cek-operator-indonesia1.p.rapidapi.com'
										 }
								};

				axios.request(options).then(function (response) {
				console.log(response.data)
				bocchi.sendText(from, response.data,id);
				}).catch(function (error) {
				console.error(error);
				bocchi.sendText(from,error,id)
				});
			break
            case prefix+'whois':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                misc.whois(args[0])
                    .then(async ({ result }) => {
                        await bocchi.reply(from, `*── 「 WHOIS 」 ──*\n\n➸ *IP address*: ${result.ip_address}\n➸ *City*: ${result.city}\n➸ *Region*: ${result.region}\n➸ *Country*: ${result.country}\n➸ *ZIP code*: ${result.postal_code}\n➸ *Latitude and longitude*: ${result.latitude_longitude}\n➸ *Time zone*: ${result.time_zone}\n➸ *Call code*: ${result.calling_code}\n➸ *Currency*: ${result.currency}\n➸ *Language code*: ${result.languages}\n➸ *ASN*: ${result.asn}\n➸ *Organization*: ${result.org}`, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'email': // By: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                const emailTarget = q.substring(0, q.indexOf('|') - 1)
                const subjectEmail = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const messageEmail = q.substring(q.lastIndexOf('|') + 2)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                misc.email(emailTarget, subjectEmail, messageEmail)
                    .then(async ({ result }) => {
                        if (result.status === '204') {
                            await bocchi.reply(from, 'Server busy!', id)
                        } else {
                            await bocchi.reply(from, `*Success sending email*!\n➸ *Target*: ${emailTarget}\n➸ *Subject*: ${result.subjek}\n➸ *Message*: ${result.pesan}`, id)
                            console.log('Success sending email!')
                        }
                    })
            break
            case prefix+'addsticker': // by @hardianto02_
            case prefix+'addstiker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id) 
                if (isQuotedSticker) {
                    if (_stick.includes(q)) {
                        await bocchi.reply(from, eng.stickerAddAlready(q), id)
                    } else { 
                        _stick.push(q)
                        fs.writeFileSync('./database/sticker.json', JSON.stringify(_stick))
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        fs.writeFileSync(`./temp/sticker/${q}.webp`, mediaData)
                        await bocchi.reply(from, eng.stickerAdd(), id)
                    }
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'delsticker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (_stick.includes(q)) {
                    _stick.splice(q, 1)
                    fs.writeFileSync('./database/sticker.json', JSON.stringify(_stick))
                    fs.unlinkSync(`./temp/sticker/${q}.webp`)
                    await bocchi.reply(from, eng.stickerDel(), id)
                } else {
                    await bocchi.reply(from, eng.stickerNotFound())
                }
            break
            case prefix+'stickerlist':
            case prefix+'liststicker':
            case prefix+'stikerlist':
            case prefix+'liststiker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                let stickerList = `*── 「 STICKER DATABASE 」 ──*\nTotal: ${_stick.length}\n\n`
                for (let i of _stick) {
                    stickerList += `➸ ${i.replace(_stick)}\n`
                }
                await bocchi.sendText(from, stickerList)
            break
            case prefix+'toxic':
                if (!isRegistered) return await bocchi.reply(from , eng.notRegistered(), id)
                await bocchi.reply(from, toxic(), id)
            break
            case prefix+'reminder': // by Slavyan
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const timeRemind = q.substring(0, q.indexOf('|') - 1)
                const messRemind = q.substring(q.lastIndexOf('|') + 2)
                const parsedTime = ms(toMs(timeRemind))
                reminder.addReminder(sender.id, messRemind, timeRemind, _reminder)
                await bocchi.sendTextWithMentions(from, eng.reminderOn(messRemind, parsedTime, sender))
                const intervRemind = setInterval(async () => {
                    if (Date.now() >= reminder.getReminderTime(sender.id, _reminder)) {
                        await bocchi.sendTextWithMentions(from, eng.reminderAlert(reminder.getReminderMsg(sender.id, _reminder), sender))
                        _reminder.splice(reminder.getReminderPosition(sender.id, _reminder), 1)
                        fs.writeFileSync('./database/user/reminder.json', JSON.stringify(_reminder))
                        clearInterval(intervRemind)
                    }
                }, 1000)
            break
            case prefix+'imagetourl':
            case prefix+'imgtourl':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const linkImg = await uploadImages(mediaData, `${sender.id}_img`)
                    await bocchi.reply(from, linkImg, id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'translate':
            case prefix+'trans':
            case prefix+'tr':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                if (quotedMsg) {
                const textos = quotedMsg.body
                const languagets = args[0]
                translate(textos, {to: languagets}).then(ress => {bocchi.reply(from, ress.text, id)})
                } else {
                const texto = q.substring(0, q.indexOf('|') - 1)
                const languaget = q.substring(q.lastIndexOf('|') + 2)
                translate(texto, {to: languaget}).then(res => {bocchi.reply(from, res.text, id)})
                }
            break
            case prefix+'bass':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    if (args.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter(`equalizer=f=40:width_type=h:width=50:g=${args[0]}`)
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await bocchi.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'nightcore':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isAudio || isQuotedAudio || isVoice || isQuotedVoice) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedAudio || isQuotedVoice ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.mp3`)
                    const fileOutputPath = path.join(temp, 'audio', `${name}.mp3`)
                    fs.writeFile(fileInputPath, mediaData, (err) => {
                        if (err) return console.error(err)
                        ffmpeg(fileInputPath)
                            .audioFilter('asetrate=44100*1.25')
                            .format('mp3')
                            .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                            .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                            .on('end', async () => {
                                console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                await bocchi.sendPtt(from, fileOutputPath, id)
                                console.log(color('[WAPI]', 'green'), 'Success sending audio!')
                                setTimeout(() => {
                                    fs.unlinkSync(fileInputPath)
                                    fs.unlinkSync(fileOutputPath)
                                }, 30000)
                            })
                            .save(fileOutputPath)
                    })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break

            // Bot
                // Example case if you have license key
            /*case prefix+'menu':
            case prefix+'help':
               await bocchi.sendButtons(from, "Hallo, saya bocchi bot.\nsilahkan klik button do bawah untuk melihan menu."),
               [
                  {id:"menu","text":"Menu"},
               ],
               "", "© Bocchi Bot")
               await bocchi.reply(from, menuId.textMenu(pushname, prefix), id)
            break*/
            case prefix+'menu':
            case prefix+'help':
		if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                const jumlahUser = _registered.length
                const premiumz = isPremium ? 'YES' : 'NO'
                await bocchi.sendText(from, `
|-_-_-[ Short Menu ]-_-_-|

_||||||||||||RAMPESBOT|||||||||||||_

Hai ${pushname}
Registered: *${jumlahUser}*
Premium:  ${premiumz}

======================
_Media Menu_
======================
=> _Youtube Downloader_
➸ *#play* judul lagu
➸ *#playvideo* judul video
➸ *#ytmp3* link yutub
➸ *#ytmp4* link yutub
---------------------
=> _Other Media_
➸ *#tiktok* link tiktok
➸ *#igdl* link ig
➸ *#fb* link video fb
======================
_Search Menu_
======================
➸ *#google* yg dicari
➸ *#igs* username instagram
➸ *#igstalk* username instagram
======================
_Converter Menu_
======================
➸ *#tomp3* reply video
➸ *#toimg* reply sticker
➸ *#imgtourl* reply foto
======================
_Other Menu_
======================
➸ *#stickermenu*
➸ *#group*
➸ *#owner*
➸ *#bot*
======================

*NOTE :*
_DILARANG CALL DAN SPAM Bot_
_PELANGGAR AUTOBLOCK_
THX...
	`,id)
            break
            case prefix+'stickermenu':
            bocchi.sendText(from, eng.menuSticker(), id)
            break
	    case prefix+'bot':
            bocchi.sendText(from, eng.menuBot(), id)
            break
	    case prefix+'group':
	    if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
            bocchi.sendText(from, eng.menuModeration(), id)
            break
	    case prefix+'owner':
	    if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
            bocchi.sendText(from, eng.menuOwner(), id)
            break
            case prefix+'rules':
            case prefix+'rule':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                await bocchi.sendText(from, eng.rules())
            break
            case prefix+'nsfw':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isNsfw) return await bocchi.reply(from, eng.nsfwAlready(), id)
                    _nsfw.push(groupId)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await bocchi.reply(from, eng.nsfwOn(), id)
                } else if (ar[0] === 'disable') {
                    _nsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/nsfw.json', JSON.stringify(_nsfw))
                    await bocchi.reply(from, eng.nsfwOff(), id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'status':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                await bocchi.sendText(from, `*RAM*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB / ${Math.round(os.totalmem / 1024 / 1024)} MB\n*CPU*: ${os.cpus()[0].model}`)
            break
            case prefix+'listblock':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                let block = eng.listBlock(blockNumber)
                for (let i of blockNumber) {
                    block += `@${i.replace('@c.us', '')}\n`
                }
                await bocchi.sendTextWithMentions(from, block)
            break
            case prefix+'ownerbot':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                await bocchi.sendContact(from, ownerNumber)
            break
            case prefix+'runtime': // BY HAFIZH
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                const formater = (seconds) => {
                    const pad = (s) => {
                        return (s < 10 ? '0' : '') + s
                    }
                    const hrs = Math.floor(seconds / (60 * 60))
                    const mins = Math.floor(seconds % (60 * 60) / 60)
                    const secs = Math.floor(seconds % 60)
                    return ' ' + pad(hrs) + ':' + pad(mins) + ':' + pad(secs)
                }
                const uptime = process.uptime()
                await bocchi.reply(from, `*── 「 BOT UPTIME 」 ──*\n\n❏${formater(uptime)}`, id)
            break
            case prefix+'ping':
            case prefix+'p':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                await bocchi.sendText(from, `Pong!\nSpeed: ${processTime(t, moment())} secs`)
            break
            case prefix+'delete':
            case prefix+'del':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!quotedMsg) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (isGroupMsg) {
                if (!isBotGroupAdmins) return await bocchi.reply(from, eng.botNotAdmin(), id)
                if (isGroupAdmins) {
                await bocchi.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                } else if (!isGroupAdmins) { 
                if (!quotedMsgObj.fromMe) return await bocchi.reply(from, eng.wrongFormat(), id)
                await bocchi.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
                }
                } else if (!isGroupMsg) {
                if (!quotedMsgObj.fromMe) return await bocchi.reply(from, eng.wrongFormat(), id)
                await bocchi.deleteMessage(quotedMsgObj.chatId, quotedMsgObj.id, false)
           	}
            break
            case prefix+'report':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.emptyMess(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const lastReport = daily.getLimit(sender.id, _daily)
                if (lastReport !== undefined && cd - (Date.now() - lastReport) > 0) {
                    const time = ms(cd - (Date.now() - lastReport))
                    await bocchi.reply(from, eng.daily(time), id)
                } else {
                    if (isGroupMsg) {
                        await bocchi.sendText(ownerNumber, `*── 「 REPORT 」 ──*\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Group*: ${(name || formattedTitle)}\n*Message*: ${q}`)
                        await bocchi.reply(from, eng.received(pushname), id)
                    } else {
                        await bocchi.sendText(ownerNumber, `*── 「 REPORT 」 ──*\n\n*From*: ${pushname}\n*ID*: ${sender.id}\n*Message*: ${q}`)
                        await bocchi.reply(from, eng.received(pushname), id)
                    }
                    daily.addLimit(sender.id, _daily)
                }
            break
            case prefix+'tos':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                await bocchi.sendLinkWithAutoPreview(from, 'https://github.com/SlavyanDesu/BocchiBot', eng.tos(ownerNumber))
            break
            case prefix+'react' : case prefix+'reaction' :
              if (quotedMsg) {
            	if (args.length !== 1)  return await bocchi.reply(from, eng.wrongFormat(), id)
            	const getReact = args[0]
                  await bocchi.react(quotedMsg.id, getReact)
            	} else {
            	await bocchi.reply(from, eng.wrongFormat(), id)
            	}
            break
            case prefix+'join':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isUrl(url) && !url.includes('chat.whatsapp.com')) return await bocchi.reply(from, eng.wrongFormat(), id)
                const checkInvite = await bocchi.inviteInfo(url)
                if (isOwner) {
                    await bocchi.joinGroupViaLink(url)
                    await bocchi.reply(from, eng.ok(), id)
                    await bocchi.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                } else {
                    const getGroupData = await bocchi.getAllGroups()
                    if (getGroupData.length >= groupLimit) {
                        await bocchi.reply(from, `Invite refused. Max group is: ${groupLimit}`, id)
                    } else if (getGroupData.size <= memberLimit) {
                        await bocchi.reply(from, `Invite refused. Minimum member is: ${memberLimit}`, id)
                    } else {
                        if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                        limit.addLimit(sender.id, _limit, isPremium, isOwner)
                        await bocchi.joinGroupViaLink(url)
                        await bocchi.reply(from, eng.ok(), id)
                        await bocchi.sendText(checkInvite.id, `Hello!! I was invited by ${pushname}`)
                    }
                }
            break
            case prefix+'premiumcheck':
            case prefix+'cekpremium':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, eng.notPremium(), id)
                const cekExp = ms(premium.getPremiumExpired(sender.id, _premium) - Date.now())
                await bocchi.reply(from, `*── 「 PREMIUM EXPIRED 」 ──*\n\n➸ *ID*: ${sender.id}\n➸ *Premium left*: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)`, id)
            break
            case prefix+'premiumlist':
            case prefix+'listpremium':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                let listPremi = '*── 「 PREMIUM USERS 」 ──*\n\n'
                const deret = premium.getAllPremiumUser(_premium)
                const arrayPremi = []
                for (let i = 0; i < deret.length; i++) {
                    const checkExp = ms(premium.getPremiumExpired(deret[i], _premium) - Date.now())
                    arrayPremi.push(await bocchi.getContact(premium.getAllPremiumUser(_premium)[i]))
                    listPremi += `${i + 1}. wa.me/${premium.getAllPremiumUser(_premium)[i].replace('@c.us', '')}\n➸ *Name*: ${arrayPremi[i].pushname}\n➸ *Expired*: ${checkExp.days} day(s) ${checkExp.hours} hour(s) ${checkExp.minutes} minute(s)\n\n`
                }
                await bocchi.reply(from, listPremi, id)
            break
            case prefix+'getpic':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (mentionedJidList.length !== 0) {
                    const userPic = await bocchi.getProfilePicFromServer(mentionedJidList[0])
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    if (userPic === undefined) {
                        var pek = errorImg
                    } else {
                        pek = userPic
                    }
                    await bocchi.sendFileFromUrl(from, pek, 'pic.jpg', '', id)
                } else if (args.length !== 0) {
                    const userPic = await bocchi.getProfilePicFromServer(args[0] + '@c.us')
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    if (userPic === undefined) {
                        var peks = errorImg
                    } else {
                        peks = userPic
                    }
                    await bocchi.sendFileFromUrl(from, peks, 'pic.jpg', '', id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'serial':
                if (!isRegistered) return await bocchi.reply(from, eng.registered(), id)
                if (isGroupMsg) return await bocchi.reply(from, eng.pcOnly(), id)
                if (args.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                const serials = args[0]
                if (register.checkRegisteredUserFromSerial(serials, _registered)) {
                    const name = register.getRegisteredNameFromSerial(serials, _registered)
                    const age = register.getRegisteredAgeFromSerial(serials, _registered)
                    const time = register.getRegisteredTimeFromSerial(serials, _registered)
                    const id = register.getRegisteredIdFromSerial(serials, _registered)
                    await bocchi.sendText(from, eng.registeredFound(name, age, time, serials, id))
                } else {
                    await bocchi.sendText(from, eng.registeredNotFound(serials))
                }
            break
            case prefix+'limit':
                if (isPremium || isOwner) return await bocchi.reply(from, '⤞ Limit left: ∞ (UNLIMITED)', id)
                await bocchi.reply(from, `⤞ Limit left: ${limit.getLimit(sender.id, _limit, limitCount)} / 25\n\n*_Limit direset pada pukul 00:00 WIB_*`, id)
            break

            // Weeb zone
            case prefix+'neko':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Get neko image...')
                await bocchi.sendFileFromUrl(from, (await neko.sfw.neko()).url, 'neko.jpg', '', null, null, true)
                    .then(() => console.log('Success sending neko image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'character': // by Anto
            case prefix+'chara':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                try {
                    const chara_key = await axios.get(`http://lolhuman.herokuapp.com/api/character/${q}?apikey=${config.lol}`)
                    const { name, description, favourites, media, image } = chara_key.data.result
                    let text_1 = `*── 「 ${name.full} 」 ──*\n➸ *Name*: ${name.full}\n➸ *Japanese*: ${name.native}\n➸ *ID*: ${chara_key.data.result.id}\n➸ *Favourite*: ${favourites}\n\n`
                    for (let i = 0; i < media.nodes.length; i++) {
                        const { id, idMal, title, type } = media.nodes[i]
                        text_1 += `\n\n➸ *Title*: ${title.romaji}\n➸ *Type*: ${type}\n➸ *Japanese*: ${title.native}\n➸ *Chara ID*: ${idMal}\n➸ *ID*: ${id}\n\n`
                    }
                    text_1 += `➸ *Description*: ${description}`
                    await bocchi.sendFileFromUrl(from, image.large, `${q}.jpg`, `${text_1}`, id)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error or chara not foud!', id)
                }
            break
            case prefix+'wallpaper':
            case prefix+'wp':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Get wallpaper image...')
                await bocchi.sendFileFromUrl(from, (await neko.sfw.wallpaper()).url, 'wallpaper.jpg', '', null, null, true)
                    .then(() => console.log('Success sending wallpaper image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id )
                    })
            break
            case prefix+'kemono':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Get kemonomimi image...')
                await bocchi.sendFileFromUrl(from, (await neko.sfw.kemonomimi()).url, 'kemono.jpg', '', null, null, true)
                    .then(() => console.log('Success sending kemonomimi image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'kusonime':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                weeaboo.anime(q)
                    .then(async ({ info, link_dl, sinopsis, thumb, title, error, status }) => {
                        if (status === false) {
                            return await bocchi.reply(from, error, id)
                        } else {
                            let animek = `${title}\n\n${info}\n\nSinopsis: ${sinopsis}\n\nLink download:\n${link_dl}`
                            await bocchi.sendFileFromUrl(from, thumb, 'animek.jpg', animek, null, null, true)
                                .then(() => console.log('Success sending anime info!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'komiku':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                weeaboo.manga(q)
                    .then(async ({ genre, info, link_dl, sinopsis, thumb }) => {
                        let mangak = `${info}${genre}\nSinopsis: ${sinopsis}\nLink download:\n${link_dl}`
                        await bocchi.sendFileFromUrl(from, thumb, 'mangak.jpg', mangak, null, null, true)
                            .then(() => console.log('Success sending manga info!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'wait':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    weeaboo.wait(imageBase64)
                        .then(async (result) => {
                            if (result.docs && result.docs.length <= 0) {
                                return await bocchi.reply(from, 'Anime not found! :(', id)
                            } else {
                                const { title, title_romaji, title_english, episode, similarity, filename, at, tokenthumb, anilist_id } = result.docs[0]
                                let teks = ''
                                if (similarity < 0.92) {
                                    teks = 'Low similarity. 🤔\n\n'
                                } else {
                                    teks += `*Title*: ${title}\n*Romaji*: ${title_romaji}\n*English*: ${title_english}\n*Episode*: ${episode}\n*Similarity*: ${(similarity * 100).toFixed(1)}%`
                                    const video = `https://media.trace.moe/video/${anilist_id}/${encodeURIComponent(filename)}?t=${at}&token=${tokenthumb}`
                                    await bocchi.sendFileFromUrl(from, video, `${title_romaji}.mp4`, teks, id)
                                        .then(() => console.log('Success sending anime source!'))
                                }
                            }
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'source':
            case prefix+'sauce':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    try {
                        const imageLink = await uploadImages(mediaData, `sauce.${sender.id}`)
                        console.log('Searching for source...')
                        const results = await saus(imageLink)
                        for (let i = 0; i < results.length; i++) {
                            let teks = ''
                            if (results[i].similarity < 80.00) {
                                teks = 'Low similarity. 🤔\n\n'
                            } else {
                                teks += `*Link*: ${results[i].url}\n*Site*: ${results[i].site}\n*Author name*: ${results[i].authorName}\n*Author link*: ${results[i].authorUrl}\n*Similarity*: ${results[i].similarity}%`
                                await bocchi.sendLinkWithAutoPreview(from, results[i].url, teks)
                                    .then(() => console.log('Source found!'))
                            }
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'waifu':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                weeaboo.waifu(false)
                    .then(async ({ url }) => {
                        await bocchi.sendFileFromUrl(from, url, 'waifu.png', '', id)
                            .then(() => console.log('Success sending waifu!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'anitoki':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                weeaboo.anitoki()
                    .then(async ({ result }) => {
                        let anitoki = '*── 「 ANITOKI LATEST 」 ──*'
                        for (let i = 0; i < result.length; i++) {
                            anitoki += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, anitoki, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'neonime':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                weeaboo.neonime()
                    .then(async ({ status, result }) => {
                        if (status !== 200) return await bocchi.reply(from, 'Not found.', id)
                        let neoInfo = '*── 「 NEONIME LATEST 」 ──*'
                        for (let i = 0; i < result.length; i++) {
                            const { date, title, link, desc } = result[i]
                            neoInfo += `\n\n➸ *Title*: ${title}\n➸ *Date*: ${date}\n➸ *Synopsis*: ${desc}\n➸ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, neoInfo, id)
                        console.log('Success sending Neonime latest update!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'anoboy':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                weeaboo.anoboy()
                    .then(async ({ result }) => {
                        let anoboyInfo = '*── 「 ANOBOY ON-GOING 」 ──*'
                        for (let i = 0; i < result.length; i++) {
                            anoboyInfo += `\n\n➸ *Title*: ${result[i].title}\n➸ *URL*: ${result[i].url}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, anoboyInfo, id)
                        console.log('Success sending on-going anime!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'nimesticker': // by CHIKAA CHANTEKKXXZZ
            case prefix+'animesticker': 
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                weeaboo.snime()
                    .then(async (body) => {
                        const wifegerak = body.split('\n')
                        const wifegerakx = wifegerak[Math.floor(Math.random() * wifegerak.length)]
                        await bocchi.sendStickerfromUrl(from, wifegerakx)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'quotenime':
            case prefix+'quotesnime':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                console.log('Sending random quote...')
                const quoteznime = await axios.get('https://mhankbarbar.tech/api/quotesnime/random')
                await bocchi.sendText(from, `➸ *Quotes* : ${quoteznime.data.data.quote}\n➸ *Character* : ${quoteznime.data.data.chara} from Anime ${quoteznime.data.data.anime}`, id)
                    .then(() => console.log('Success sending quotes..'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break

            // Fun
            case prefix+'bapak': // By Kris
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                axios.get(`https://api.terhambar.com/bpk?kata=${q}`)
                    .then(async (res) => await bocchi.reply(from, res.data.text, id))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'puisi': // By Kris
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                axios.get('https://masgi.herokuapp.com/api/puisi2')
                    .then(async (res) => await bocchi.reply(from, res.data.data, id))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'cerpen': // By Kris
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                axios.get('https://masgi.herokuapp.com/api/cerpen')
                    .then(async (res) => await bocchi.reply(from, res.data.data, id))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'creepyfact': // By Kris
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                fetch('https://raw.githubusercontent.com/TheSploit/CreepyFact/main/creepy.txt')
                    .then((res) => res.text())
                    .then(async (body) => {
                        let creepyx = body.split('\n')
                        let creepyz = creepyx[Math.floor(Math.random() * creepyx.length)]
                        await bocchi.reply(from, creepyz, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'quotes':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                misc.quotes()
                .then(async ({ result }) => {
                    await bocchi.reply(from, `➸ *Quotes*: ${result.quotes}\n➸ *Author*: ${result.author}`, id)
                })
            break
            case prefix+'asupan': // shansekai
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                fun.asupan()
                    .then(async (body) => {
                        const asupan = body.split('\n')
                        const asupanx = asupan[Math.floor(Math.random() * asupan.length)]
                        await bocchi.sendFileFromUrl(from, `http://sansekai.my.id/ptl_repost/${asupanx}`, 'asupan.mp4', 'Follow IG: https://www.instagram.com/ptl_repost untuk mendapatkan asupan lebih banyak.', id)
                        console.log('Success sending video!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'citacita': // Piyobot
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                fun.cita()
                    .then(async (body) => {
                        const cita = body.split('\n')
                        const randomCita = cita[Math.floor(Math.random() * cita.length)]
                        await bocchi.sendFileFromUrl(from, randomCita, 'cita.mp3', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'dadu': // by CHIKAA CHANTEKKXXZZ
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                fun.dadu()
                    .then(async (body) => {
                        const dadugerak = body.split('\n')
                        const dadugerakx = dadugerak[Math.floor(Math.random() * dadugerak.length)]
                        await bocchi.sendStickerfromUrl(from, dadugerakx, null, { author: authorWm, pack: packWm })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'dogesticker': // by CHIKAA CHANTEKKXXZZ
            case prefix+'doge':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                fun.doge()
                    .then(async (body) => {
                        const dogeg = body.split('\n')
                        const dogegx = dogeg[Math.floor(Math.random() * dogeg.length)]
                        await bocchi.sendStickerfromUrl(from, dogegx, null, { author: authorWm, pack: packWm })
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'profile':
            case prefix+'me':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                if (quotedMsg) {
                    const getQuoted = quotedMsgObj.sender.id
                    const profilePic = await bocchi.getProfilePicFromServer(getQuoted)
                    const username = quotedMsgObj.sender.name
                    const statuses = await bocchi.getStatus(getQuoted)
                    const benet = _ban.includes(getQuoted) ? 'Yes' : 'No'
                    const adm = groupAdmins.includes(getQuoted) ? 'Yes' : 'No'
                    const premi = premium.checkPremiumUser(getQuoted, _premium) ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(getQuoted, _level)
                    const xpMe = level.getLevelingXp(getQuoted, _level)
                    const req = 5 * Math.pow(levelMe, 2) + 50 * 1 + 100
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfp = errorImg
                    } else {
                        pfp = profilePic
                    }
                    await bocchi.sendFileFromUrl(from, pfp, `${username}.jpg`, eng.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                } else {
                    const profilePic = await bocchi.getProfilePicFromServer(sender.id)
                    const username = pushname
                    const statuses = await bocchi.getStatus(sender.id)
                    const benet = isBanned ? 'Yes' : 'No'
                    const adm = isGroupAdmins ? 'Yes' : 'No'
                    const premi = isPremium ? 'Yes' : 'No'
                    const levelMe = level.getLevelingLevel(sender.id, _level)
                    const xpMe = level.getLevelingXp(sender.id, _level)
                    const req = 5 * Math.pow(levelMe, 2) + 50 * 1 + 100
                    const { status } = statuses
                    if (profilePic === undefined) {
                        var pfps = errorImg
                    } else {
                        pfps = profilePic
                    }
                    await bocchi.sendFileFromUrl(from, pfps, `${username}.jpg`, eng.profile(username, status, premi, benet, adm, levelMe, req, xpMe), id)
                }
            break
            case prefix+'hartatahta':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating harta tahta text...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/hartatahta?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'partner':
            case prefix+'pasangan':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const nama = q.substring(0, q.indexOf('|') - 1)
                const pasangan = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, eng.wait(), id)
                fun.pasangan(nama, pasangan)
                    .then(async ({ result }) => {
                        await bocchi.reply(from, result.hasil, id)
                            .then(() => console.log('Success sending fortune!'))
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'zodiac':
            case prefix+'zodiak':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                fun.zodiak(args[0])
                    .then(async ({ result }) => {
                        if (result.status === 204) {
                            return await bocchi.reply(from, result.ramalan, id)
                        } else {
                            let ramalan = `Zodiak: ${result.zodiak}\n\nRamalan: ${result.ramalan}\n\nAngka laksek: ${result.nomorKeberuntungan}\n\n${result.motivasi}\n\n${result.inspirasi}`
                            await bocchi.reply(from, ramalan, id)
                                .then(() => console.log('Success sending zodiac fortune!'))
                        }
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'write':
            case prefix+'nulis':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating writing...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/write?text=${q}&apikey=${config.vhtear}`, 'nulis.jpg', '', id)
                    .then(() => console.log('Success sending write image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'ffbanner': // By: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating FF banner...')
                const teks1ffanjg = q.substring(0, q.indexOf('|') - 1)
                const teks2ffanjg = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/bannerff?title=${teks1ffanjg}&text=${teks2ffanjg}&apikey=${config.vhtear}`, id)
                console.log('Success!')
            break
            case prefix+'caklontong': //By: VideFrelan
                if (!isGroupMsg) return bocchi.reply(from, eng.groupOnly(), id)
                if (!isRegistered) return  bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                const sleep = (ms) => {
                    return new Promise(resolve => setTimeout(resolve, ms))
                }
                fun.caklontong()
                    .then(async ( { result }) => {
                        await bocchi.reply(from, `➸ *Soal*: ${result.soal}`, id)
                        await bocchi.sendText(from, '30 Detik Tersisa...')
                        await sleep(10000)
                        await bocchi.sendText(from, '20 Detik Tersisa...')
                        await sleep(10000)
                        await bocchi.sendText(from, '10 Detik Tersisa...')
                        await sleep(10000)
                        await bocchi.reply(from, `➸ *Jawaban*: ${result.jawaban}\n${result.desk}`, id)
                        console.log('Success sending the answers!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!')
                    })
            break
            case prefix+'tebakgambar':
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                const tsleep = (ms) => {
                    return new Promise(resolve => setTimeout(resolve, ms))
                }
                fun.tbkgmbr()
                    .then(async ({ result }) => {
                        await bocchi.sendFileFromUrl(from, result.soal_gbr, 'TebakGambar.jpg', '', id)
                        await bocchi.sendText(from, '50 Detik Tersisa...')
                        await tsleep(10000)
                        await bocchi.sendText(from, '40 Detik Tersisa...')
                        await tsleep(10000)
                        await bocchi.sendText(from, '30 Detik Tersisa...')
                        await tsleep(10000)
                        await bocchi.sendText(from, '20 Detik Tersisa...')
                        await tsleep(10000)
                        await bocchi.sendText(from, '10 Detik Tersisa...')
                        await tsleep(10000)
                        await bocchi.reply(from, `➸ *Jawaban*: ${result.jawaban}`, id)
                        console.log('Success sending tebakgambar result!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!')
                    })
            break    
            case prefix+'fflogo': // By: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating FF logo...')
                const karakter = q.substring(0, q.indexOf('|') - 1)
                const teksff = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/logoff?hero=${karakter}&text=${teksff}&apikey=${config.vhtear}`, id)
                console.log('Success!')
            break
            case prefix+'text3d':
            case prefix+'3dtext':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating 3D text...')
                await bocchi.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/text3d?text=${q}`,`${q}.jpg`, '', id)
                console.log('Success creating 3D text!')
            break
            case prefix+'simi': // by: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                fun.simi(q)
                    .then(async ({ jawaban }) => {
                        await bocchi.reply(from, jawaban, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, `Error!\n\n${err}`, id)
                    })
            break
            case prefix+'glitchtext':
            case prefix+'glitext':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const teks1 = q.substring(0, q.indexOf('|') - 1)
                const teks2 = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating glitch text...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/glitchtext?text1=${teks1}&text2=${teks2}&apikey=${config.vhtear}`, 'glitch.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'phmaker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const kiri = q.substring(0, q.indexOf('|') - 1)
                const kanan = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating Pornhub text...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/pornlogo?text1=${kiri}&text2=${kanan}&apikey=${config.vhtear}`, 'ph.jpg', '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'blackpink':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating Blackpink text...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/blackpinkicon?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creting image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'galaxy':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating galaxy text...')
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/galaxytext?text=${q}&apikey=${config.vhtear}`, `${q}.jpg`, '', id)
                    .then(() => console.log('Success creating image!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'tod':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                await bocchi.reply(from, 'Sebelum bermain berjanjilah akan melaksanakan apapun perintah yang diberikan.' , id)
                await bocchi.sendText(from, `Silakan ketik *${prefix}truth* atau *${prefix}dare*`)
            break
            case prefix+'weton':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const tgl = q.substring(0, q.indexOf('|') - 1)
                const bln = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const thn = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, eng.wait(), id)
                fun.weton(tgl, bln, thn)
                    .then(async ({ result }) => {
                        await bocchi.reply(from, result.hasil, id)
                        console.log('Success sending weton info!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'truth':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                fun.truth()
                    .then(async (body) => {
                        const tod = body.split('\n')
                        const randomTod = tod[Math.floor(Math.random() * tod.length)]
                        await bocchi.reply(from, randomTod, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'hilih':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                fun.hilihteks(q)
                    .then(async ( { result }) => {
                        await bocchi.reply(from, result.kata, id)
                        console.log('Success sending hilih text!')
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'dare':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                fun.dare()
                    .then(async (body) => {
                        const dare = body.split('\n')
                        const randomDare = dare[Math.floor(Math.random() * dare.length)]
                        await bocchi.reply(from, randomDare, id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'triggered':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    console.log(color('[WAPI]', 'green'), 'Downloading and decrypting media...')
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const temp = './temp'
                    const name = new Date() * 1
                    const fileInputPath = path.join(temp, `${name}.gif`)
                    const fileOutputPath = path.join(temp, 'video', `${name}.mp4`)
                    canvas.Canvas.trigger(mediaData)
                        .then((buffer) => {
                            canvas.write(buffer, fileInputPath)
                            ffmpeg(fileInputPath)
                                .outputOptions([
                                    '-movflags faststart',
                                    '-pix_fmt yuv420p',
                                    '-vf scale=trunc(iw/2)*2:trunc(ih/2)*2'
                                ])
                                .inputFormat('gif')
                                .on('start', (commandLine) => console.log(color('[FFmpeg]', 'green'), commandLine))
                                .on('progress', (progress) => console.log(color('[FFmpeg]', 'green'), progress))
                                .on('end', async () => {
                                    console.log(color('[FFmpeg]', 'green'), 'Processing finished!')
                                    await bocchi.sendMp4AsSticker(from, fileOutputPath, { fps: 30, startTime: '00:00:00.0', endTime : '00:00:10.0', loop: 0, crop: false }, { author: 'RampesBot', pack: `Sticker by bocchi's bot`})
                                    console.log(color('[WAPI]', 'green'), 'Success sending GIF!')
                                    setTimeout(() => {
                                        fs.unlinkSync(fileInputPath)
                                        fs.unlinkSync(fileOutputPath)
                                    }, 30000)
                                })
                                .save(fileOutputPath)
                        })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'trash':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                try {
                    await bocchi.reply(from, eng.wait(), id)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        const ypics = await bocchi.getProfilePicFromServer(mentionedJidList[i])
                        if (ypics === undefined) {
                            var ypfps = errorImg
                        } else {
                            ypfps = ypics
                        }
                    }
                    canvas.Canvas.trash(ypfps)
                        .then(async (buffer) => {
                            canvas.write(buffer, `./temp/${sender.id}_trash.png`)
                            await bocchi.sendFile(from, `./temp/${sender.id}_trash.png`, `${sender.id}_trash.png`, '', id)
                            fs.unlinkSync(`./temp/${sender.id}_trash.png`)
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case prefix+'hitler':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                try {
                    await bocchi.reply(from, eng.wait(), id)
                    for (let i = 0; i < mentionedJidList.length; i++) {
                        const ypics = await bocchi.getProfilePicFromServer(mentionedJidList[i])
                        if (ypics === undefined) {
                            var ypf = errorImg
                        } else {
                            ypf = ypics
                        }
                    }
                    canvas.Canvas.hitler(ypf)
                        .then(async (buffer) => {
                            canvas.write(buffer, `./temp/${sender.id}_hitler.png`)
                            await bocchi.sendFile(from, `./temp/${sender.id}_hitler.png`, `${sender.id}_hitler.png`, '', id)
                            fs.unlinkSync(`./temp/${sender.id}_hitler.png`)
                        })
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case prefix+'wasted':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && type === 'image' || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    const encryptMediaWt = isQuotedImage ? quotedMsg : message
                    const dataPotoWt = await decryptMedia(encryptMediaWt, uaOverride)
                    const fotoWtNya = await uploadImages(dataPotoWt, `fotoProfilWt.${sender.id}`)
                    await bocchi.reply(from, eng.wait(), id)
                    await bocchi.sendFileFromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`, 'Wasted.jpg', 'Ini..., sticker nya lagi di kirim', id).then(() => bocchi.sendStickerfromUrl(from, `https://some-random-api.ml/canvas/wasted?avatar=${fotoWtNya}`))
                    console.log('Success sending Wasted image!')
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'kiss':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                try {
                    if (isMedia && isImage || isQuotedImage) {
                        if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                        limit.addLimit(sender.id, _limit, isPremium, isOwner)
                        await bocchi.reply(from, eng.wait(), id)
                        const encryptMedia = isQuotedImage ? quotedMsg : message
                        const ppRaw = await bocchi.getProfilePicFromServer(sender.id)
                        const ppSecond = await decryptMedia(encryptMedia, uaOverride)
                        if (ppRaw === undefined) {
                            var ppFirst = errorImg
                        } else {
                            ppFirst = ppRaw
                        }
                        canvas.Canvas.kiss(ppFirst, ppSecond)
                            .then(async (buffer) => {
                                canvas.write(buffer, `${sender.id}_kiss.png`)
                                await bocchi.sendFile(from, `${sender.id}_kiss.png`, `${sender.id}_kiss.png`, '', id)
                                fs.unlinkSync(`${sender.id}_kiss.png`)
                            })
                    } else {
                        await bocchi.reply(from, eng.wrongFormat(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case prefix+'phcomment':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const usernamePh = q.substring(0, q.indexOf('|') - 1)
                const commentPh = q.substring(q.lastIndexOf('|') + 2)
                const ppPhRaw = await bocchi.getProfilePicFromServer(sender.id)
                if (ppPhRaw === undefined) {
                    var ppPh = errorImg
                } else {
                    ppPh = ppPhRaw
                }
                const dataPpPh = await bent('buffer')(ppPh)
                const linkPpPh = await uploadImages(dataPpPh, `${sender.id}_ph`)
                await bocchi.reply(from, eng.wait(), id)
                const preprocessPh = await axios.get(`https://nekobot.xyz/api/imagegen?type=phcomment&image=${linkPpPh}&text=${commentPh}&username=${usernamePh}`)
                await bocchi.sendFileFromUrl(from, preprocessPh.data.message, 'ph.jpg', '', id)
                console.log('Success creating image!')
            break
            case prefix+'neontext':
            case prefix+'neon':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const atasnya = q.substring(0, q.indexOf('|') - 1)
                const tengahnya = q.substring(q.indexOf('|') + 2, q.lastIndexOf('|') - 1)
                const bawahnya = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, eng.wait(), id)
                await bocchi.sendFileFromUrl(from, `http://docs-jojo.herokuapp.com/api/neon?text1=${atasnya}&text2=${tengahnya}&text3=${bawahnya}`, 'neon.jpg', '', id)
                console.log('Success creating image!')
            break
            case prefix+'firemaker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/fire_maker?text=${q}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case prefix+'mlmaker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const namaHero = q.substring(0, q.indexOf('|') - 1)
                const teksMl = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, eng.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/logoml?hero=${namaHero}&text=${teksMl}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case prefix+'balloonmaker':
            case prefix+'blmaker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const namaKiri = q.substring(0, q.indexOf('|') - 1)
                const namaKanan = q.substring(q.lastIndexOf('|') + 2)
                await bocchi.reply(from, eng.wait(), id)
                await bocchi.sendFileFromUrl(from, `https://api.vhtear.com/balloonmaker?text1=${namaKiri}&text2=${namaKanan}&apikey=${config.vhtear}`)
                console.log('Success creating image!')
            break
            case prefix+'sliding':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                await bocchi.sendVideoAsGif(from, `https://api.vhtear.com/slidingtext?text=${q}&apikey=${config.vhtear}`, 'sliding.gif', '', id)
                console.log('Success creating GIF!')
            break
            case prefix+'text': // by: irham01
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                try {
                    if (ar[0] === 'burnpaper') {
                        const vfburn = await axios.get(`https://videfikri.com/api/textmaker/burnpaper/?text=${args[1]}`)
                        await bocchi.sendFileFromUrl(from, vfburn.data.result.img, `${q}.jpg`, '', id)
                    } else if (ar[0] === 'candlemug') {
                        const vfcandlemug = await axios.get(`https://videfikri.com/api/textmaker/candlemug/?text=${args[1]}`)
                        await bocchi.sendFileFromUrl(from, vfcandlemug.data.result.img, `${q}.jpg`, '', id)
                    } else if (ar[0] === 'lovemsg') {
                        const vflovemsg = await axios.get(`https://videfikri.com/api/textmaker/lovemsg/?text=${args[1]}`)
                        await bocchi.sendFileFromUrl(from, vflovemsg.data.result.img, `${q}.jpg`, '', id)
                    } else if (ar[0] === 'mugflower') {
                        const vfmugflower = await axios.get(`https://videfikri.com/api/textmaker/mugflower/?text=${args[1]}`)
                        await bocchi.sendFileFromUrl(from, vfmugflower.data.result.img, `${q}.jpg`, '', id)
                    } else if (ar[0] === 'narutobanner') {
                        const vfnarutobanner = await axios.get(`https://videfikri.com/api/textmaker/narutobanner/?text=${args[1]}`)
                        await bocchi.sendFileFromUrl(from, vfnarutobanner.data.result.img, `${q}.jpg`, '', id)
                    } else if (ar[0] === 'paperonglass') {
                        const vfpaperonglass = await axios.get(`https://videfikri.com/api/textmaker/paperonglass/?text=${args[1]}`)
                        await bocchi.sendFileFromUrl(from, vfpaperonglass.data.result.img, `${q}.jpg`, '', id)
                    } else if (ar[0] === 'romancetext') {
                        const vfromancetext = await axios.get(`https://videfikri.com/api/textmaker/romancetext/?text=${args[1]}`)
                        await bocchi.sendFileFromUrl(from, vfromancetext.data.result.img, `${q}.jpg`, '', id)
                    } else if (ar[0] === 'shadowtext') {
                        const vfshadowtext = await axios.get(`https://videfikri.com/api/textmaker/shadowtext/?text=${args[1]}`)
                        await bocchi.sendFileFromUrl(from, vfshadowtext.data.result.img, `${q}.jpg`, '', id)
                    } else if (ar[0] === 'tiktokeffect') {
                        const vftiktokeffect = await axios.get(`https://videfikri.com/api/textmaker/tiktokeffect/?text=${args[1]}`)
                        await bocchi.sendFileFromUrl(from, vftiktokeffect.data.result.img, `${q}.jpg`, '', id)
                    } else {
                        await bocchi.reply(from, eng.menuText(), id)
                    }
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break

            // Sticker
            case prefix+'stikernobg':
            case prefix+'stickernobg': // by: VideFrelan
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    await bocchi.sendImageAsSticker(from, mediaData, { author: authorWm, pack: packWm, removebg: true })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)                
                    /*const q = await uploadImages(mediaData, `stickernobg.${sender.id}`)
                    misc.stickernobg(q)
                        .then(async ({ result }) => {
                            await bocchi.sendStickerfromUrl(from, result.image, null, { author: authorWm, pack: packWm })
                            console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })*/
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'stickerwm': // By Slavyan
            case prefix+'stcwm':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, eng.notPremium(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await bocchi.sendImageAsSticker(from, imageBase64, { author: author, pack: packname })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'stickermeme': //Chika Chantexx
            case prefix+'stcmeme':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const top = q.substring(0, q.indexOf('|') - 1)
                    const topp = top.replace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    const bottom = q.substring(q.lastIndexOf('|') + 2)
                    const bottomm = bottom.replace('', '_').replace('\n','%5Cn').replace('?', '~q').replace('%', '~p').replace('#', '~h').replace('/', '~s')
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const getUrl = await uploadImages(mediaData, `meme.${sender.id}`)
                    const create = `https://api.memegen.link/images/custom/${topp}/${bottomm}.png?background=${getUrl}`
                    await bocchi.sendStickerfromUrl(from, create, null, { author: authorWm, pack: packWm, keepScale: true })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'takestick': // By: VideFrelan, Chika Chantexx
            case prefix+'take':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q.includes('|')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (quotedMsg && quotedMsg.type == 'sticker') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const mediaDataTake = await decryptMedia(quotedMsg)
                    const packname = q.substring(0, q.indexOf('|') - 1)
                    const author = q.substring(q.lastIndexOf('|') + 2)
                    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaDataTake.toString('base64')}`
                    await bocchi.sendImageAsSticker(from, imageBase64, { author: author, pack: packname })
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'sticker':
            case prefix+'stiker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await bocchi.sendImageAsSticker(from, imageBase64, { author: authorWm, pack: packWm })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'stickerp':
            case prefix+'stikerp':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isPremium) return await bocchi.reply(from, eng.notPremium(), id)
                if (isMedia && isImage || isQuotedImage) {
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await bocchi.sendImageAsSticker(from, imageBase64, { author: authorWm, pack: packWm, keepScale: true })
                    console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'stickergif':
            case prefix+'stikergif':
            case prefix+'sgif':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (isMedia && isVideo || isGif || isQuotedVideo || isQuotedGif) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        const encryptMedia = isQuotedGif || isQuotedVideo ? quotedMsg : message
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const _mimetype = isQuotedVideo || isQuotedGif ? quotedMsg.mimetype : mimetype
                    const videoBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await bocchi.sendMp4AsSticker(from, videoBase64, null, { stickerMetadata: true, author: authorWm, pack: packWm, keepScale: true, fps: 30, startTime: '00:00:00.0', endTime : '00:00:05.0', crop: false, loop: 0 })
                            .then(() => {
                                console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, eng.videoLimit(), id)
                    }
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'ttg':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.reply(from, eng.wait(), id)
                await bocchi.sendStickerfromUrl(from, `https://api.vhtear.com/textxgif?text=${q}&apikey=${config.vhtear}`, null, { author: authorWm, pack: packWm })
                    .then(() => console.log('Success creating GIF!'))
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'stickertoimg':
            case prefix+'stikertoimg':
            case prefix+'toimg':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isQuotedSticker) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        const mediaData = await decryptMedia(quotedMsg, uaOverride)
                        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
                        await bocchi.sendFile(from, imageBase64, 'sticker.jpg', '', id)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'emojisticker':
            case prefix+'emojistiker':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (args.length !== 1) return bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const emoji = emojiUnicode(args[0])
                await bocchi.reply(from, eng.wait(), id)
                console.log('Creating emoji code for =>', emoji)
                await bocchi.sendStickerfromUrl(from, `https://api.vhtear.com/emojitopng?code=${emoji}&apikey=${config.vhtear}`, null, { author: authorWm, pack: packWm })
                    .then(async () => {
                        await bocchi.reply(from, eng.ok(), id)
                        console.log(`Sticker processed for ${processTime(t, moment())} seconds`)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Emoji not supported!', id)
                    })
            break

            // NSFW
            case prefix+'multilewds':
            case prefix+'multilewd':
            case prefix+'mlewds':
            case prefix+'mlewd':
                // Premium feature, contact the owner.
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (!isPremium) return await bocchi.reply(from, eng.notPremium(), id)
                    await bocchi.reply(from, eng.botNotPremium(), id)
                } else {
                    if (!isPremium) return await bocchi.reply(from, eng.notPremium(), id)
                    await bocchi.reply(from, eng.botNotPremium(), id)
                }
            break
            case prefix+'multifetish':
            case prefix+'mfetish':
                // Premium feature, contact the owner.
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (!isPremium) return await bocchi.reply(from, eng.notPremium(), id)
                    await bocchi.reply(from, eng.botNotPremium(), id)
                } else {
                    if (!isPremium) return await bocchi.reply(from, eng.notPremium(), id)
                    await bocchi.reply(from, eng.botNotPremium(), id)
                }
            break
            case prefix+'lewds':
            case prefix+'lewd':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    nsfw.randomLewd()
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'lewd.jpg', '', null, null, true)
                                .then(() => console.log('Success sending lewd!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case prefix+'fetish':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (ar.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await bocchi.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, err, id)
                    }
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        if (ar[0] === 'armpits') {
                            nsfw.armpits()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'armpits.jpg', '', id)
                                        .then(() => console.log('Success sending armpits pic!'))
                                })
                        } else if (ar[0] === 'feets') {
                            nsfw.feets()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'feets.jpg', '', id)
                                        .then(() => console.log('Success sending feets pic!'))
                                })
                        } else if (ar[0] === 'thighs') {
                            nsfw.thighs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'thighs.jpg', '', id)
                                        .then(() => console.log('Success sending thighs pic!'))
                                })
                        } else if (ar[0] === 'ass') {
                            nsfw.ass()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ass.jpg', '', id)
                                        .then(() => console.log('Success sending ass pic!'))
                                })
                        } else if (ar[0] === 'boobs') {
                            nsfw.boobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'boobs.jpg', '', id)
                                        .then(() => console.log('Success sending boobs pic!'))
                                })
                        } else if (ar[0] === 'belly') {
                            nsfw.belly()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'belly.jpg', '', id)
                                        .then(() => console.log('Success sending belly pic!'))
                                })
                        } else if (ar[0] === 'sideboobs') {
                            nsfw.sideboobs()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'sideboobs.jpg', '', id)
                                        .then(() => console.log('Success sending sideboobs pic!'))
                                })
                        } else if (ar[0] === 'ahegao') {
                            nsfw.ahegao()
                                .then(async ({ url }) => {
                                    await bocchi.sendFileFromUrl(from, url, 'ahegao.jpg', '', id)
                                        .then(() => console.log('Success sending ahegao pic!'))
                                })
                        } else {
                            await bocchi.reply(from, 'Tag not found.', id)
                        }
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
            case prefix+'nhentai':
            case prefix+'nh':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (isNaN(Number(args[0]))) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                     return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await bocchi.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                            console.log('Success sending nHentai info!')
                        } catch (err) {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        }
                    } else {
                        await bocchi.reply(from, eng.nhFalse(), id)
                    }
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    console.log(`Searching nHentai for ${args[0]}...`)
                    const validate = await nhentai.exists(args[0])
                    if (validate === true) {
                        try {
                            const pic = await api.getBook(args[0])
                                .then((book) => {
                                     return api.getImageURL(book.cover)
                                })
                            const dojin = await nhentai.getDoujin(args[0])
                            const { title, details, link } = dojin
                            const { tags, artists, languages, categories } = details
                            let teks = `*Title*: ${title}\n\n*Tags*: ${tags.join(', ')}\n\n*Artists*: ${artists}\n\n*Languages*: ${languages.join(', ')}\n\n*Categories*: ${categories}\n\n*Link*: ${link}`
                            await bocchi.sendFileFromUrl(from, pic, 'nhentai.jpg', teks, id)
                            console.log('Success sending nHentai info!')
                        } catch (err) {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        }
                    } else {
                        await bocchi.reply(from, eng.nhFalse(), id)
                    }
                }
            break
            case prefix+'nhdl':
                // Premium feature, contact the owner.
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (!isPremium) return await bocchi.reply(from, eng.notPremium(), id)
                    await bocchi.reply(from, eng.botNotPremium(), id)
                } else {
                    if (!isPremium) return await bocchi.reply(from, eng.notPremium(), id)
                    await bocchi.reply(from, eng.botNotPremium(), id)
                }
            break
            case prefix+'nhsearch':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (args.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `*── 「 NHENTAI 」 ──*\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await bocchi.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    console.log(`Searching nHentai for ${q}...`)
                    nana.search(q)
                        .then(async (g) => {
                            let txt = `*── 「 NHENTAI 」 ──*\n\n➸ *Result for*: ${q}`
                            for (let i = 0; i < g.results.length; i++) {
                                const { id, title, language } = g.results[i]
                                txt += `\n\n➸ *Title*: ${title}\n➸ *Language*: ${language.charAt(0).toUpperCase() + language.slice(1)}\n➸ *Link*: nhentai.net/g/${id}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                            }
                            await bocchi.sendFileFromUrl(from, g.results[0].thumbnail.s, `${g.results[0].title}`, txt, id)
                                .then(() => console.log('Success sending nHentai results!'))
                        })
                        .catch(async(err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case prefix+'nekopoi':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        const res = await nekobocc.latest()
                        let text = '*── 「 NEKOPOI LATEST 」 ──*'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        const res = await nekobocc.latest()
                        let text = '*── 「 NEKOPOI LATEST 」 ──*'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
            case prefix+'nekosearch':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '*── 「 NEKOPOI 」 ──*'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        const res = await nekobocc.search(q)
                        let text = '*── 「 NEKOPOI 」 ──*'
                        for (let i = 0; i < res.result.length; i++) {
                            const { title, link } = res.result[i]
                            text += `\n\n➵ *Title*: ${title}\n➵ *Link*: ${link}\n\n=_=_=_=_=_=_=_=_=_=_=_=_=`
                        }
                        await bocchi.reply(from, text, id)
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
            case prefix+'lolivid':  //Piyobot
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                weeaboo.loli()
                    .then(async (body) => {
                        let lolipiyo = body.split('\n')
                        let papololi = lolipiyo[Math.floor(Math.random() * lolipiyo.length)]
                        await bocchi.sendFileFromUrl(from, papololi, 'loli.mp4', '', id)
                    })
                    .catch(async (err) => {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    })
            break
            case prefix+'waifu18':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    weeaboo.waifu(true)
                        .then(async ({ url }) => {
                            await bocchi.sendFileFromUrl(from, url, 'waifu.png', '', id)
                                .then(() => console.log('Success sending waifu!'))
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break
            case prefix+'phdl':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isUrl(url) && !url.includes('pornhub.com')) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    try {
                        nsfw.phDl(url)
                            .then(async ({ title, download_urls, thumbnail_url }) => {
                                const count = Object.keys(download_urls).length
                                if (count !== 2) {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    const shortsMid = await misc.shortener(download_urls['480P'])
                                    const shortsHigh = await misc.shortener(download_urls['720P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)\n${shortsMid} (480P)\n${shortsHigh} (720P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                } else {
                                    const shortsLow = await misc.shortener(download_urls['240P'])
                                    await bocchi.sendFileFromUrl(from, thumbnail_url, `${title}`, `Title: ${title}\n\nLinks:\n${shortsLow} (240P)`, id)
                                        .then(() => console.log('Success sending pornhub metadata!'))
                                }
                            })
                    } catch (err) {
                        console.error(err)
                        await bocchi.reply(from, 'Error!', id)
                    }
                }
            break
            case prefix+'yuri':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.eroYuri()).url, 'yuri.jpg', '', id)
                }
            break
            case prefix+'lewdavatar':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.avatar()).url, 'avatar.jpg', '', id)
                }
            break
            case prefix+'femdom':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    await bocchi.sendFileFromUrl(from, (await neko.nsfw.femdom()).url, 'femdom.jpg', '', id)
                }
            break
            case prefix+'cersex':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (isGroupMsg) {
                    if (!isNsfw) return await bocchi.reply(from, eng.notNsfw(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    nsfw.cersex()
                        .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, result.image, 'cersex.jpg', `*── 「 ${result.judul} 」 ──*\n\n${result.cerita}`, id)
                            console.log('Success sending cersex!')
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                } else {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    nsfw.cersex()
                        .then(async ({ result }) => {
                            await bocchi.sendFileFromUrl(from, result.image, 'cersex.jpg', `*── 「 ${result.judul} 」 ──*\n\n${result.cerita}`, id)
                            console.log('Success sending cersex!')
                        })
                        .catch(async (err) => {
                            console.error(err)
                            await bocchi.reply(from, 'Error!', id)
                        })
                }
            break

            // Moderation command
            case prefix+'revoke':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return bocchi.reply(from, eng.botNotAdmin(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.revokeGroupInviteLink(groupId)
                await bocchi.sendTextWithMentions(from, `Group link revoked by @${sender.id.replace('@c.us', '')}`)
            break
            case prefix+'grouplink':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, eng.botNotAdmin(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const gcLink = await bocchi.getGroupInviteLink(groupId)
                await bocchi.reply(from, gcLink, id)
            break
            case prefix+'mutegc':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return bocchi.reply(from, eng.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.setGroupToAdminsOnly(groupId, true)
                    await bocchi.sendText(from, eng.gcMute())
                } else if (ar[0] === 'disable') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.setGroupToAdminsOnly(groupId, false)
                    await bocchi.sendText(from, eng.gcUnmute())
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'add':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, eng.botNotAdmin(), id)
                if (args.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                try {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.addParticipant(from, `${args[0]}@c.us`)
                    await bocchi.sendText(from, '🎉 Welcome! 🎉')
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, 'Error!', id)
                }
            break
            case prefix+'kick':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, eng.botNotAdmin(), id)
                if (mentionedJidList.length === 0) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.sendTextWithMentions(from, `Good bye~\n${mentionedJidList.map(x => `@${x.replace('@c.us', '')}`).join('\n')}`)
                for (let i of mentionedJidList) {
                    if (groupAdmins.includes(i)) return await bocchi.sendText(from, eng.wrongFormat())
                    await bocchi.removeParticipant(groupId, i)
                }
            break
            case prefix+'promote':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, eng.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (groupAdmins.includes(mentionedJidList[0])) return await bocchi.reply(from, eng.adminAlready(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.promoteParticipant(groupId, mentionedJidList[0])
                await bocchi.reply(from, eng.ok(), id)
            break
            case prefix+'demote':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, eng.botNotAdmin(), id)
                if (mentionedJidList.length !== 1) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                if (!groupAdmins.includes(mentionedJidList[0])) return await bocchi.reply(from, eng.notAdmin(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                await bocchi.demoteParticipant(groupId, mentionedJidList[0])
                await bocchi.reply(from, eng.ok(), id)
            break
            case prefix+'leave':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                await bocchi.sendText(from, 'Bye~ 👋')
                await bocchi.leaveGroup(groupId)
            break
            case prefix+'admins':
            case prefix+'admin':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const groupAdm = await bocchi.getGroupAdmins(groupId)
                const lastAdmin = daily.getLimit(sender.id, _daily)
                if (lastAdmin !== undefined && cd - (Date.now() - lastAdmin) > 0) {
                    const time = ms(cd - (Date.now() - lastAdmin))
                    await bocchi.reply(from, eng.daily(time), id)
                } else if (isOwner) {
                    let txt = '╔══✪〘 *ADMINS* 〙✪══\n'
                    for (let i = 0; i < groupAdm.length; i++) {
                        txt += '╠➥'
                        txt += ` @${groupAdm[i].replace(/@c.us/g, '')}\n`
                    }
                    txt += '╚═〘 *B O C C H I  B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                } else {
                    let txt = '╔══✪〘 *ADMINS* 〙✪══\n'
                    for (let i = 0; i < groupAdm.length; i++) {
                        txt += '╠➥'
                        txt += ` @${groupAdm[i].replace(/@c.us/g, '')}\n`
                    }
                    txt += '╚═〘 *B O C C H I  B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                    daily.addLimit(sender.id, _daily)
                }
            break
            case prefix+'everyone':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                limit.addLimit(sender.id, _limit, isPremium, isOwner)
                const groupMem = await bocchi.getGroupMembers(groupId)
                const lastEveryone = daily.getLimit(sender.id, _daily)
                if (lastEveryone !== undefined && cd - (Date.now() - lastEveryone) > 0) {
                    const time = ms(cd - (Date.now() - lastEveryone))
                    await bocchi.reply(from, eng.daily(time), id)
                } else if (isOwner || isPremium) {
                    let txt = '╔══✪〘 *EVERYONE* 〙✪══\n'
                        for (let i = 0; i < groupMem.length; i++) {
                            txt += '╠➥'
                            txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                    txt += '╚═〘 *B O C C H I  B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                } else {
                    let txt = '╔══✪〘 *EVERYONE* 〙✪══\n'
                        for (let i = 0; i < groupMem.length; i++) {
                            txt += '╠➥'
                            txt += ` @${groupMem[i].id.replace(/@c.us/g, '')}\n`
                        }
                    txt += '╚═〘 *B O C C H I  B O T* 〙'
                    await bocchi.sendTextWithMentions(from, txt)
                    daily.addLimit(sender.id, _daily)
                }
            break
            case prefix+'groupicon':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return bocchi.reply(from, eng.botNotAdmin(), id)
                if (isMedia && isImage || isQuotedImage) {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    await bocchi.reply(from, eng.wait(), id)
                    const encryptMedia = isQuotedImage ? quotedMsg : message
                    const _mimetype = isQuotedImage ? quotedMsg.mimetype : mimetype
                    const mediaData = await decryptMedia(encryptMedia, uaOverride)
                    const imageBase64 = `data:${_mimetype};base64,${mediaData.toString('base64')}`
                    await bocchi.setGroupIcon(groupId, imageBase64)
                    await bocchi.sendText(from, eng.ok())
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'antilink':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, eng.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await bocchi.reply(from, eng.detectorOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _antilink.push(groupId)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await bocchi.reply(from, eng.detectorOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _antilink.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antilink.json', JSON.stringify(_antilink))
                    await bocchi.reply(from, eng.detectorOff(), id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'leveling':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isLevelingOn) return await bocchi.reply(from, eng.levelingOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await bocchi.reply(from, eng.levelingOn(), id)
                } else if (ar[0] === 'disable') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
                    await bocchi.reply(from, eng.levelingOff(), id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'welcome':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isWelcomeOn) return await bocchi.reply(from, eng.welcomeOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _welcome.push(groupId)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await bocchi.reply(from, eng.welcomeOn(), id)
                } else if (ar[0] === 'disable') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _welcome.splice(groupId, 1)
                    fs.writeFileSync('./database/group/welcome.json', JSON.stringify(_welcome))
                    await bocchi.reply(from, eng.welcomeOff(), id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'autosticker':
            case prefix+'autostiker':
            case prefix+'autostik':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isAutoStickerOn) return await bocchi.reply(from, eng.autoStikOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _autosticker.push(groupId)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await bocchi.reply(from, eng.autoStikOn(), id)
                } else if (ar[0] === 'disable') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _autosticker.splice(groupId, 1)
                    fs.writeFileSync('./database/group/autosticker.json', JSON.stringify(_autosticker))
                    await bocchi.reply(from, eng.autoStikOff(), id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'antinsfw':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (!isBotGroupAdmins) return await bocchi.reply(from, eng.botNotAdmin(), id)
                if (ar[0] === 'enable') {
                    if (isDetectorOn) return await bocchi.reply(from, eng.antiNsfwOnAlready(), id)
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _antinsfw.push(groupId)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await bocchi.reply(from, eng.antiNsfwOn(name, formattedTitle), id)
                } else if (ar[0] === 'disable') {
                    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await bocchi.reply(from, eng.limit(), id)
                    limit.addLimit(sender.id, _limit, isPremium, isOwner)
                    _antinsfw.splice(groupId, 1)
                    fs.writeFileSync('./database/group/antinsfw.json', JSON.stringify(_antinsfw))
                    await bocchi.reply(from, eng.antiNsfwOff(), id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break

            // Owner command
            case prefix+'block':
            case prefix+'blok':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                if (mentionedJidList.length !== 0) {
                    for (let blok of mentionedJidList) {
                        if (blok === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                        await bocchi.contactBlock(blok)
                    }
                    await bocchi.reply(from, eng.doneOwner(), id)
                } else if (args.length === 1) {
                    await bocchi.contactBlock(args[0] + '@c.us')
                    await bocchi.reply(from, eng.doneOwner(), id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'unblock':
            case prefix+'unblok':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                if (mentionedJidList.length !== 0) {
                    for (let blok of mentionedJidList) {
                        if (blok === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                        await bocchi.contactUnblock(blok)
                    }
                    await bocchi.reply(from, eng.doneOwner(), id)
                } else if (args.length === 1) {
                    await bocchi.contactUnblock(args[0] + '@c.us')
                    await bocchi.reply(from, eng.doneOwner(), id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'bc':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, eng.emptyMess(), id)
                const chats = await bocchi.getAllChatIds()
                for (let bcs of chats) {
                    let cvk = await bocchi.getChatById(bcs)
                    if (!cvk.isReadOnly) await bocchi.sendText(bcs, `${q}\n\n- Slavyan (Kal)\n_Broadcasted message_`)
                }
                await bocchi.reply(from, eng.doneOwner(), id)
            break
            case prefix+'clearall':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                const allChats = await bocchi.getAllChats()
                for (let delChats of allChats) {
                    await bocchi.deleteChat(delChats.id)
                }
                await bocchi.reply(from, eng.doneOwner(), id)
            break
            case prefix+'leaveall':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, eng.emptyMess(), id)
                const allGroup = await bocchi.getAllGroups()
                for (let gclist of allGroup) {
                    await bocchi.sendText(gclist.contact.id, q)
                    await bocchi.leaveGroup(gclist.contact.id)
                }
                await bocchi.reply(from, eng.doneOwner())
            break
            case prefix+'getses':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                const ses = await bocchi.getSnapshot()
                await bocchi.sendFile(from, ses, 'session.png', eng.doneOwner())
            break
            case prefix+'ban':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let benet of mentionedJidList) {
                            if (benet === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                            _ban.push(benet)
                            fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        }
                        await bocchi.reply(from, eng.doneOwner(), id)
                    } else {
                        _ban.push(args[1] + '@c.us')
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await bocchi.reply(from, eng.doneOwner(), id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                        _ban.splice(mentionedJidList[0], 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await bocchi.reply(from, eng.doneOwner(), id)
                    } else{
                        _ban.splice(args[1] + '@c.us', 1)
                        fs.writeFileSync('./database/bot/banned.json', JSON.stringify(_ban))
                        await bocchi.reply(from, eng.doneOwner(), id)
                    }
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'eval':
            case prefix+'ev':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, eng.wrongFormat(), id)
                try {
                    let evaled = await eval(q)
                    if (typeof evaled !== 'string') evaled = require('util').inspect(evaled)
                    await bocchi.sendText(from, evaled)
                } catch (err) {
                    console.error(err)
                    await bocchi.reply(from, err, id)
                }
            break
            case prefix+'shutdown':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                await bocchi.sendText(from, 'Otsukaresama deshita~ 👋')
                    .then(async () => await bocchi.kill())
                    .catch(() => new Error('Target closed.'))
            break
            case prefix+'premium':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                if (ar[0] === 'add') {
                    if (mentionedJidList.length !== 0) {
                        for (let prem of mentionedJidList) {
                            if (prem === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                            premium.addPremiumUser(prem, args[2], _premium)
                            await bocchi.reply(from, `*── 「 PREMIUM ADDED 」 ──*\n\n➸ *ID*: ${prem}\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                        }
                    } else {
                        premium.addPremiumUser(args[1] + '@c.us', args[2], _premium)
                        await bocchi.reply(from, `*── 「 PREMIUM ADDED 」 ──*\n\n➸ *ID*: ${args[1]}@c.us\n➸ *Expired*: ${ms(toMs(args[2])).days} day(s) ${ms(toMs(args[2])).hours} hour(s) ${ms(toMs(args[2])).minutes} minute(s)`, id)
                    }
                } else if (ar[0] === 'del') {
                    if (mentionedJidList.length !== 0) {
                        if (mentionedJidList[0] === botNumber) return await bocchi.reply(from, eng.wrongFormat(), id)
                        _premium.splice(premium.getPremiumPosition(mentionedJidList[0], _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await bocchi.reply(from, eng.doneOwner(), id)
                    } else {
                        _premium.splice(premium.getPremiumPosition(args[1] + '@c.us', _premium), 1)
                        fs.writeFileSync('./database/bot/premium.json', JSON.stringify(_premium))
                        await bocchi.reply(from, eng.doneOwner(), id)
                    }
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'setstatus':
            case prefix+'setstats':
            case prefix+'setstat':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                if (!q) return await bocchi.reply(from, eng.emptyMess(), id)
                await bocchi.setMyStatus(q)
                await bocchi.reply(from, eng.doneOwner(), id)
            break
            case prefix+'mute':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(pushname), id)
                if (!isGroupMsg) return await bocchi.reply(from, eng.groupOnly(), id)
                if (!isGroupAdmins) return await bocchi.reply(from, eng.adminOnly(), id)
                if (ar[0] === 'enable') {
                    if (isMute) return await bocchi.reply(from, eng.muteChatOnAlready(), id)
                    _mute.push(groupId)
                    fs.writeFileSync('./database/bot/mute.json', JSON.stringify(_mute))
                    await bocchi.reply(from, eng.muteChatOn(), id)
                } else if (ar[0] === 'disable') {
                    _mute.splice(groupId, 1)
                    fs.writeFileSync('./database/bot/mute.json', JSON.stringify(_mute))
                    await bocchi.reply(from, eng.muteChatOff(), id)
                } else {
                    await bocchi.reply(from, eng.wrongFormat(), id)
                }
            break
            case prefix+'setname':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                if (!q || q.length > 25) return await bocchi.reply(from, eng.wrongFormat(), id)
                await bocchi.setMyName(q)
                await bocchi.reply(from, eng.nameChanged(q), id)
            break
            case prefix+'grouplist':
                if (!isRegistered) return await bocchi.reply(from, eng.notRegistered(), id)
                const getGroups = await bocchi.getAllGroups()
                let txtGc = '*── 「 GROUP LIST 」 ──*\n'
                for (let i = 0; i < getGroups.length; i++) {
                    txtGc += `\n\n❏ *Name*: ${getGroups[i].name}\n❏ *Unread messages*: ${getGroups[i].unreadCount} messages`
                }
                await bocchi.sendText(from, txtGc)
            break
            case prefix+'reset':
                if (!isOwner) return await bocchi.reply(from, eng.ownerOnly(), id)
                const reset = []
                _limit = reset
                console.log('Hang tight, it\'s time to reset usage limits...')
                fs.writeFileSync('./database/user/limit.json', JSON.stringify(_limit))
                await bocchi.reply(from, eng.doneOwner(), id)
                console.log('Success!')
            break
            
            default:
                if (isCmd) {
                    await bocchi.reply(from, eng.cmdNotFound(command), id)
                }
            break
        }
    } catch (err) {
        console.error(color('[ERROR]', 'red'), err)
    }
}
/********** END OF MESSAGE HANDLER **********/
