#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const json = (file)=>JSON.parse(fs.readFileSync(file, 'utf-8'));
const version = json('package.json').version;

for (const dir of fs.readdirSync('.')){
    const pkgPath = path.join(dir, 'package.json');
    if (!fs.existsSync(pkgPath)){
      continue;
    }
    const pkg = json(pkgPath);
    pkg.version = version;
    if (pkg.scripts.prepublish){
      pkg.scripts['prepublish-old'] = pkg.scripts.prepublish;
      pkg.scripts.prepublish = '';
    }
    for(const section of ['dependencies', 'peerDependencies', 'devDependencies']){
      if (section in pkg)
      for(const key of Object.keys(pkg[section])){
        if (/subschema/.test(key)){
          pkg[section][key] = version;
        }
      }
    }
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2), 'utf-8');
}
