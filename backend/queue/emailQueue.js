const Queue = require("bull");
const sentMail = require("../helper/sentMail");

const emailQueue = new Queue("emailQueue", {
  redis: { port: 6379, host: "127.0.0.1" },
});

emailQueue.process(async (job) => {
   (job);
  await sentMail(job.data);
});

module.exports = emailQueue;
