/*
  use localdata module to create newData
  
  updateData(format, current, updated, cb, ...pushData)
    format: what format the array of data is in (array name)
    current: current data file EXCLUDING array name (which is why format is passed thru)
    updated: array of unique identifiers (id's) for new list to be
    cb: callback, returns newData
    ...pushData: variable parameter to be pushed with ID within newData
      use ~~ surrounding evaluated variables. obj is DEFAULT for unique identifier (id)
*/

/*
  updateData updates local, public data (MOST likely within public/data/ folder)
  from folders pertaining such data. this data is not to be stored in mongodb,
  but mainly local / main-page stuff. things like logos, icons, and other
  information like homepage messages, "about us" text, etc. can all be updated
  with this function.
*/

var updateData = function updateData(format, current, updated, cb, ...pushInfo){
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

/*
  ONLY WORKS WITH DATA THAT HAVE 'ID' AND IS COMPARING TO LIST OF NEW 'ID''S

  can change to be even MORE universal with big data (but doubtful since this
  was made specifically for local data). 2 datasets are just compared
  and uobj and cobj are compared as uobj.id and cobj.id
*/

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
  updateData: updateData,
  compare: compare
}

module.exports = localdata;
