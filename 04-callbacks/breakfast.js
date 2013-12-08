function haveBreakfast(food, drink, callback) {
  console.log('having some '+food+' and '+drink);

  if(callback && typeof(callback) === 'function')
    callback();
}


haveBreakfast('bacon','orange juice', function() {
  console.log('Finished breakfast. Now its time for work');
});