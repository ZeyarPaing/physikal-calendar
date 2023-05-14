const { readFileSync, writeFileSync } = require("fs");

const content = readFileSync("./_BackupData.json", {
  encoding: "utf-8",
});

const data = JSON.parse(content);
const newData = Object.fromEntries(
  Object.entries(data).map(([key, value]) => {
    const splitKey = key.split("-");
    if (key && +splitKey[1] < 6) {
      let newKey = `2024-${splitKey[1]}-${splitKey[2]}`;
      return [newKey, value];
    }
    return [key, value];
  })
);
console.log("data : ", newData);
writeFileSync("./_NewBackupData.json", JSON.stringify(newData, null, 2));
