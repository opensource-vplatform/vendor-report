const fs = require('fs');

const path = require('path');

const buildUtils = require('./buildUtils');

const reportDist = path.resolve(__dirname, '../packages/excel/dist');

let ghost = false;


// 获取命令行参数
const args = process.argv.slice(2);

// 解析命令行参数
const ghostArgIndex = args.findIndex(arg => arg.startsWith('--ghost'));
if (ghostArgIndex !== -1) {
  ghost = args[ghostArgIndex].split('=')[1] || true;
  console.log('打包纯净版(Ghost)版本');
}

const spreadsheetDir = path.resolve(
  __dirname,
  `../packages/integration/vdaas-service${ghost ? '-ghost' : ''}/resources/static/vdaasservice/spreadsheet`
);

const getDirNames = function (sourcePath) {
  const filenames = fs.readdirSync(sourcePath);
  if (filenames && filenames.length > 0) {
    const dirNames = [];
    filenames.forEach((filename) => {
      const sourceFilePath = path.resolve(sourcePath, filename);
      const stats = fs.statSync(sourceFilePath);
      if (stats.isDirectory()) {
        dirNames.push(filename);
      }
    });
    return dirNames;
  }
  return [];
};

dirnames = getDirNames(reportDist);

dirnames.forEach((dirname) => {
  buildUtils.copy(
    path.resolve(reportDist, dirname),
    path.resolve(spreadsheetDir, dirname)
  );
});
