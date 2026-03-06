const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('app', function(filePath) {
    if (filePath.endsWith('.tsx')) {
        let code = fs.readFileSync(filePath, 'utf8');
        let original = code;
        code = code.replace(/```\w*\n?/g, '');
        code = code.replace(/```/g, '');
        
        // fix issues in tw strings
        code = code.replace(/tw`([^`]+)`/g, (match, p1) => {
            let fixed = p1
                .replace(/ - /g, '-')
                .replace(/ \/ /g, '/')
                .replace(/ - /g, '-')
                .replace(/- \[\s*/g, '-[')
                .replace(/\s*\] \//g, ']/')
                .replace(/% \]/g, '%]')
                .replace(/\s*\] /g, '] ')
                .replace(/ \//g, '/')
                .replace(/\/ /g, '/')
                .replace(/\]([a-zA-Z])/g, '] $1'); // add space back like `w-[10px]text-white`
            return 'tw`' + fixed.trim() + '`';
        });
        
        if (code !== original) {
            fs.writeFileSync(filePath, code);
            console.log("Fixed", filePath);
        }
    }
});
