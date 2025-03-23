const axios = require('axios');

module.exports = {
  name: 'animeinfo',
  description: 'Search information for anime!',
  author: 'Dale Mekumi', 
  usage: 'animeinfo animetitle',
  async execute(senderId, args, pageAccessToken, sendMessage) {

    const prompt = args.join(' ');
    if (!prompt) return sendMessage(senderId, { text: "𝑼𝒔𝒂𝒈𝒆: 𝒂𝒏𝒊𝒎𝒆𝒊𝒏𝒇𝒐 𝒂𝒏𝒊𝒎𝒆𝒕𝒊𝒕𝒍𝒆" }, pageAccessToken);
    
    sendMessage(senderId, { text: "⚙ 𝑺𝒆𝒂𝒓𝒄𝒉𝒊𝒏𝒈 𝑨𝒏𝒊𝒎𝒆 𝑷𝒍𝒆𝒂𝒔𝒆 𝑾𝒂𝒊𝒕..." }, pageAccessToken);

    try {
      const response = await axios.get(`https://kaiz-apis.gleeze.com/api/mal?title=${encodeURIComponent(prompt)}`);
      const auth = response.data.author;
      const title = response.data.title;
      const status = response.data.status;
      const episodes = response.data.episodes;
      const duration = response.data.duration;
      const genres = response.data.genres;
      const description = response.data.description;
      const url = response.data.url;
      const picture = response.data.picture;

      const responseTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Manila', hour12: true });

      const picmessage = {
    attachment: {
      type: 'image',
      payload: {
        url: picture,
      },
    },
  };
  await sendMessage(senderId, picmessage, pageAccessToken);

      sendMessage(senderId, { 
        text: `𝑨𝒏𝒊𝒎𝒆 𝑰𝒏𝒇𝒐𝒓𝒎𝒂𝒕𝒊𝒐𝒏\n\n𝑻𝒊𝒕𝒍𝒆: ${title}\n\n𝑨𝒖𝒕𝒉𝒐𝒓: ${auth}\n\n𝑺𝒕𝒂𝒕𝒖𝒔: ${status}\n\n𝑬𝒑𝒊𝒔𝒐𝒅𝒆𝒔: ${episodes}\n\n𝑫𝒖𝒓𝒂𝒕𝒊𝒐𝒏: ${duration}\n\n𝑮𝒆𝒏𝒓𝒆𝒔: ${genres}\n\n𝑺𝒐𝒖𝒓𝒄𝒆: ${url}\n\n\n𝑫𝒆𝒔𝒄𝒓𝒊𝒑𝒕𝒊𝒐𝒏\n\n${description}\n\n⏰ 𝗔𝘀𝗶𝗮/𝗠𝗮𝗻𝗶𝗹𝗮: ${responseTime}\n\n` 
      }, pageAccessToken);
    } catch (error) {
      console.error(error);
      sendMessage(senderId, { text: `❌ 𝗔𝗻 𝗲𝗿𝗿𝗼𝗿 𝗼𝗰𝗰𝘂𝗿𝗿𝗲𝗱: ${error.message}` }, pageAccessToken);
    }
  }
};
