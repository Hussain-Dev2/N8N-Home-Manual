const { spawn } = require("child_process");
require("dotenv").config(); // لقراءة متغيرات البيئة من .env

// تشغيل n8n
const n8nProcess = spawn("n8n", [], {
  env: process.env, // استخدام Environment Variables من Render أو .env
  stdio: "pipe",    // ربط stdout و stderr
});

// تسجيل أي بيانات صادرة عن n8n
n8nProcess.stdout.on("data", (data) => {
  console.log(`[n8n stdout] ${data.toString()}`);
});

n8nProcess.stderr.on("data", (data) => {
  console.error(`[n8n stderr] ${data.toString()}`);
});

// متابعة إغلاق العملية
n8nProcess.on("close", (code) => {
  console.log(`n8n exited with code ${code}`);
});

// رسالة لتأكيد تشغيل server.js
console.log("Server.js running: n8n should be starting now...");
