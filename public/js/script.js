changePage = function(page){
    window.location.href = '/' + page;
}

Array.prototype.pushUnique = function(item){
    if(this.indexOf(item) === -1) this.push(item);
}

Array.prototype.move = function(oldIndex,newIndex){
	return this.splice(newIndex, 0, this.splice(oldIndex, 1)[0]);
}