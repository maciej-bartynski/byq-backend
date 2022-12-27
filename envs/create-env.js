const fs = require('fs');

const boosterMap = {
    local: 'local',
    staging: 'staging'
}

fs.copyFile(`${__dirname}/template.env.${boosterMap[process.env.MARKER]}`, `${__dirname}/../.env`, (err) => {
  if (err) throw err;
});