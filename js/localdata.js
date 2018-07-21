// trying to make this universal, can probably route this instead of putting it into app.js..
// for now it can stay here
var createNewData = function createNewData(format, current, updated, cb, ...pushInfo){
  let newData = format;
  let key = Object.keys(newData)[0];
  newData[key] = current;
  compare(current, updated, function(changes){
    newData[key].forEach(function(obj, i){
      if(changes.remove.includes(obj.id)){
        newData[key] = newData[key].filter(function(id){ return id !== obj; });
      }
    });
    changes.add.forEach(function(obj, i){
      let pushing = '{"id": "' + obj + '", ';
      pushInfo.forEach(function(param, j){
        let p = pushInfo[j].split('~~');
        p.forEach(function(variable, index){
          if(index % 2 && variable !== '') pushing = pushing + eval(variable);
          else pushing = pushing + variable;
        });
        if(j == pushInfo.length - 1) pushing = pushing + '}'; else pushing = pushing + ', '
      });
      newData[key].push(JSON.parse(pushing));
    });
  });
  cb(newData);
}

// ONLY WORKS WITH DATA THAT HAVE 'ID' AND IS COMPARING TO LIST OF NEW 'ID''S
// can change to be even MORE universal with big data, where 2 datasets are just compared
// and uobj and cobj are compared as uobj.id and cobj.id
var compare = function compare(current, updated, cb){
  let changes = {"exists":[], "add":[], "remove":[]};
  updated.forEach(function(uobj, i){ // updated obj
    current.forEach(function(cobj, j){ // current obj
      if(cobj.id == uobj){
        changes.exists.push(uobj);
        changes.add = changes.add.filter(function(id){ return id !== uobj; });
        changes.remove = changes.remove.filter(function(id){ return id !== cobj.id; });
      }else if(!changes.exists.includes(uobj) && !changes.add.includes(uobj)){
        changes.add.push(uobj);
      }else if(!changes.exists.includes(cobj.id) && !changes.remove.includes(cobj.id)){
        changes.remove.push(cobj.id);
      }
    });
  });
  cb(changes);
}

var localdata = {
  createNewData: createNewData,
  compare: compare
}

module.exports = localdata;
