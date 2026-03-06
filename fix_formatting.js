const fs = require('fs');

function fixFile(file) {
    let code = fs.readFileSync(file, 'utf8');
    code = code.replace(/```\w*\n?/g, '');
    code = code.replace(/```/g, '');
    
    // Specifically fix issues in active.tsx tw strings
    if (file.includes('active.tsx')) {
        code = code.replace(/tw`([^`]+)`/g, (match, p1) => {
            let fixed = p1
                .replace(/ - /g, '-')
                .replace(/ \/ /g, '/')
                .replace(/ - /g, '-') // second pass for things like flex - col
                .replace(/- \[/g, '-[')
                .replace(/\] \//g, ']/')
                .replace(/% \]/g, '%]')
                .replace(/\] /g, ']')
                .replace(/ \//g, '/')
                .replace(/\/ /g, '/');
            return 'tw`' + fixed.trim() + '`';
        });
    }
    fs.writeFileSync(file, code);
}

fixFile('app/parking/active.tsx');
fixFile('app/parking/success.tsx');
