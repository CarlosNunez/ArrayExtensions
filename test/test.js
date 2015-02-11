var arrayExtensions = require('../ArrayExtensions.js')
var chai = require('chai');

chai.config.includeStack = true;

expect = chai.expect;

describe( 'Array', function(){

  	describe( '#each', function() {
  		var people = [ 
		    {name: 'pedro', age: 19 },
		    {name: 'pablo', age: 16 },
		    {name: 'topo', age: 18 }
		    ];
	  	it( 'should execute function returning a string for each object in array', function() {
		  	var strings = [],
		    pedro,
		    pablo,
		    topo;

		    people.each( function(x){
		    	var currentString = x.name + ' is ' + x.age + ' years old';
		    	strings.push(currentString);
		    });

		  	pedro = strings[0];
		  	pablo = strings[1];
		  	topo = strings[2];

		  	expect(strings).to.have.length(people.length);

		 	expect(pedro).to.be.a('string');
		 	expect(pedro).to.equal('pedro is 19 years old')
		 	expect(pablo).to.equal('pablo is 16 years old')
		 	expect(topo).to.equal('topo is 18 years old' );	
		});
		
  	});

  	describe( '#where', function(){
  		var people = [ 
		    {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP'] },
		    {name: 'juan', age: 23, skills: ['PHP', 'Drink tea']  },
		    {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS'] }
		    ];

		it('Should return devs without the PHP skills', function() {   
		    var peopleWithOOP = [],
		    pedro = '',
		    pablo = '';
			people.where(function(dev){
				var skills = dev.skills.where( function(skill) { return skill === 'PHP'; });

				if( skills.length === 0 ) {
					peopleWithOOP.push(dev);
				}
			});

			pedro = peopleWithOOP[0].name;
			pablo = peopleWithOOP[1].name;

		 	expect(peopleWithOOP).to.have.length(2);
		 	expect(pedro).to.equal( "pedro" );
		 	expect(pablo).to.equal( "pablo" );	
	
		});

  	});

  	describe( '#any', function(){
  		var juan =  {name: 'juan', age: 23, skills: ['PHP', 'Drink tea'] },
  		result;

		it('Taking a function as parameter should return true finding the defined value', function(){
			result = juan.skills.any( function(skill){ 
				return skill === 'PHP'
			});

			expect(result).to.be.true;
		});

		it('Taking a string as a parameter should return true finding the defined value', function(){
			result = juan.skills.any( 'PHP' );

			expect(result).to.be.true;
		});

		it('Taking a function as parameter should return false not finding the defined value', function(){
			result = juan.skills.any( function(skill){ 
				return skill === 'OOP' 
			})

			expect(result).to.be.false; 
		});

		it('Takin a string as parameter should return false on not finding the defined value', function(){
			result = juan.skills.any( 'OOP' );

			expect(result).to.be.false;
		});

  	});

  	describe( '#select', function(){
  		var people = [ 
		    {name: 'pedro', age: 19 },
		    {name: 'pablo', age: 16 },
		    {name: 'topo', age: 18 }
		],
		names= [];

		it('Is given an array of objects with a name property, returns an array of names, specified on callback.', function(){
			names = people.select(function(dev){
				return dev.name;
			})

			expect(names).to.have.length(3);

			expect(names).to.contain('pedro');
			expect(names).to.contain('pablo');
			expect(names).to.contain('topo');

		});
  	});

  	describe( '#take', function() {
  		var children = [
		    {name: 'ana', sex: 'f'},
		    {name: 'fosto', sex: 'm'},
		    {name: 'jane', sex: 'f'},
		    {name: 'yadi', sex: 'f'},
		    {name: 'lili', sex: 'f'},
		    {name: 'bany', sex: 'm'},
		    {name: 'rod', sex: null},
		    {name: 'auro', sex: 'f'},
		    {name: 'martin', sex: 'm'}
		];

		it( 'Is given 3 as parameter, takes exactly 3 elements from the original array',function() {
			var threeChildren = [];
			threeChildren = children.take(3);

			expect(threeChildren).to.have.length(3);
		});

		it( 'Is given 3 and a function that specifies being female as parameter all female, takes exactly 3 elements from the original array',function() {
			var threeChildren = [],
			conditionFunction = function(x) {
				return x.sex === 'f';
			}

			threeChildren = children.take(3, conditionFunction);

			expect(threeChildren).to.have.length(3);

			expect(threeChildren[0]).to.satisfy(conditionFunction);
			expect(threeChildren[1]).to.satisfy(conditionFunction);
			expect(threeChildren[2]).to.satisfy(conditionFunction);
				
		});	

		it( 'Is given 5 and a function that specifies being male as a parameter, takes 3 elements as there are only 3 male children in the original array', function() {
			var threeChildren = [],
			conditionFunction = function(x) {
				return x.sex === 'm';
			}

			threeChildren = children.take( 5, conditionFunction);

			expect(threeChildren).to.have.length(3);

			expect(threeChildren[0]).to.satisfy(conditionFunction);
			expect(threeChildren[1]).to.satisfy(conditionFunction);
			expect(threeChildren[2]).to.satisfy(conditionFunction);

		});
  	});

	describe( '#skip', function(){ 
		var children = [
		    {name: 'ana', sex: 'f'},
		    {name: 'fosto', sex: 'm'},
		    {name: 'jane', sex: 'f'},
		    {name: 'yadi', sex: 'f'},
		    {name: 'lili', sex: 'f'},
		    {name: 'bany', sex: 'm'},
		    {name: 'rod', sex: null},
		    {name: 'auro', sex: 'f'},
		    {name: 'martin', sex: 'm'}
		];

		it( 'Is given 3 as a paramter, resulting array skips first 3 children, resulting in an array with 6 children starting wit yadi', function() {
			var result = [],
			firstChild;

			result = children.skip(3);
			firstChild = result[0].name;

			expect(result).to.have.length(6);
			expect(firstChild).to.equal('yadi')

		});

	});

	describe( '#first', function(){
  		var children = [
		    {name: 'ana', sex: 'f'},
		    {name: 'fosto', sex: 'm'},
		    {name: 'jane', sex: 'f'},
		    {name: 'yadi', sex: 'f'},
		    {name: 'lili', sex: 'f'},
		    {name: 'bany', sex: 'm'},
		    {name: 'rod', sex: null},
		    {name: 'auro', sex: 'f'},
		    {name: 'martin', sex: 'm'}
		],
		firstChild;

		it('Is given no arguments, returns the first element of the array', function(){
			firstChild = children.first();

			expect(firstChild.name).to.equal('ana');
		});

		it('Is given function that defines a condition, returns the first element that meets the condition in the array', function(){
			firstChild = children.first( function( x ){ 
				return x.sex === 'm'
			});

			expect(firstChild.name).to.equal( 'fosto' );
		});
	});

	describe( '#last', function(){
  		var children = [
		    {name: 'ana', sex: 'f'},
		    {name: 'fosto', sex: 'm'},
		    {name: 'jane', sex: 'f'},
		    {name: 'yadi', sex: 'f'},
		    {name: 'lili', sex: 'f'},
		    {name: 'bany', sex: 'm'},
		    {name: 'rod', sex: null},
		    {name: 'auro', sex: 'f'},
		    {name: 'martin', sex: 'm'}
		],
		firstChild;

		it('Is given no arguments, returns the last element of the array', function(){
			lastChild = children.last();

			expect(lastChild.name).to.equal( 'martin' );
		});

		it('Is given function that defines a condition, returns the last element that meets the condition in the array', function(){
			lastChild = children.last( function( x ){ 
				return x.sex === 'f'
			});

			expect(lastChild.name).to.equal( 'auro' );
		});
	});

	describe( '#count', function(){
		var children = [
		    {name: 'ana', sex: 'f'},
		    {name: 'fosto', sex: 'm'},
		    {name: 'jane', sex: 'f'},
		    {name: 'yadi', sex: 'f'},
		    {name: 'lili', sex: 'f'},
		    {name: 'bany', sex: 'm'},
		    {name: 'rod', sex: null},
		    {name: 'auro', sex: 'f'},
		    {name: 'martin', sex: 'm'}
		],
		count;

		it( 'Given no parameter, returns the total count of elements', function(){
			count = children.count();

			expect(count).to.equal(9)
		})

		it( 'Given a function as aprameter will return the number of elements that satisfy the function condition', function(){
			count = children.count( function(x) { 
				return x.sex === 'f'
			});

			expect(count).to.equal(5);
		})
	})

	describe( '#index', function(){
		var children = [
		    {name: 'ana', sex: 'f'},
		    {name: 'fosto', sex: 'm'},
		    {name: 'jane', sex: 'f'},
		    {name: 'yadi', sex: 'f'},
		    {name: 'lili', sex: 'f'},
		    {name: 'bany', sex: 'm'},
		    {name: 'rod', sex: null},
		    {name: 'auro', sex: 'f'},
		    {name: 'martin', sex: 'm'}
		],
		numbers = [1, 3, 5, 7, 9, 11],
		index;

		it('Given a function as parameter returns the index of the element that satisfies the specification', function() {
			index = children.index( function(x) {
				return x.name === 'bany';
			})

			expect(index).to.equal(5);
		});

		it( 'Given a function as parameter returns the -1 when no element satisfies the specification', function() {
			index = children.index( function(x) {
				return x.name === 'mark';
			})

			expect(index).to.equal(-1);
		});

		it( 'Given a value as parameter will return the index of the value that matches', function() {
			index = numbers.index(7);

			expect(index).to.equal(3);
		});

	});

	describe( '#pluck', function(){
  		var people = [ 
		    {name: 'pedro', age: 19 },
		    {name: 'pablo', age: 16 },
		    {name: 'topo', age: 18 }
		],
		names = [];

		it( 'Is given the name of a property, returns an array of said property', function(){
			names = people.pluck('name');

			expect(names).to.have.length(3);
			expect(names).to.contain('pedro');
			expect(names).to.contain('pablo');
			expect(names).to.contain('topo');

		});
  	});

	describe( '#sum', function() { 
		var numbers = [3,2,1,4],
		strings = ['3','2','1','4'],
  		people = [ 
		    {name: 'pedro', age: 19 },
		    {name: 'pablo', age: 16 },
		    {name: 'topo', age: 18 }
		],
		sum;

		it( 'on an array of number, given no arguents, it will add them together', function() {
			result = numbers.sum();

			expect(result).to.equal(10);
		});

		it( 'on an array of numbers, given a functon as argument, will sum the result of an operation defined in the function', function() {
			result = strings.sum( function(x) {
				return x * 2; 
			});

			expect(result).to.equal(20);
		})

		it( 'given a function it will sum the returned value of the function on each element', function() {
			result = people.sum( function( person ) {
				return person.age;
			});

			expect(result).to.equal(53);
		})

	});

	describe( '#max', function() {
		var children = [
		    {name: 'ana', sex: 'f'},
		    {name: 'fosto', sex: 'm'},
		    {name: 'jane', sex: 'f'},
		    {name: 'yadi', sex: 'f'},
		    {name: 'lili', sex: 'f'},
		    {name: 'bany', sex: 'm'},
		    {name: 'rod', sex: null},
		    {name: 'auro', sex: 'f'},
		    {name: 'martin', sex: 'm'}
		],
		numbers = [1, 3, 5, 7, 9, 11, 2, 4, 6],
		max,
		longestNameChild,
		oldestPerson;

		it( 'on an array of numbers, given no parameters, return max value', function() { 
			max = numbers.max();

			expect(max).to.equal(11);
		});

		it( 'on and array of of objects, given a function as parameter return the element whose value that satisfies the function, and is the bigger one', function() {

			longestNameChild = children.max(function(a, b){ return a.name.length - b.name.length }).name

			expect(longestNameChild).to.equal('martin');
		});
	});

	describe( '#min', function() {
		var children = [
		    {name: 'ana', sex: 'f'},
		    {name: 'fosto', sex: 'm'},
		    {name: 'jane', sex: 'f'},
		    {name: 'yadi', sex: 'f'},
		    {name: 'lili', sex: 'f'},
		    {name: 'bany', sex: 'm'},
		    {name: 'rod', sex: null},
		    {name: 'auro', sex: 'f'},
		    {name: 'martin', sex: 'm'}
		],
		numbers = [1, 3, 5, 7, 9, 11, 2, 4, 6],
		max,
		shortestNameChild,
		oldestPerson;

		it( 'on an array of numbers, given no parameters, return min value', function() { 
			max = numbers.min();

			expect(max).to.equal(1);
		});

		it( 'on and array of of objects, given a function as parameter return the element whose value that satisfies the function, and is the lowest one', function() {

			shortestNameChild = children.min(function(a, b){ return a.name.length - b.name.length }).name

			expect(shortestNameChild).to.equal('ana');
		});
	});

	describe( '#flatten', function() {
		var numbers = [1,2,3,[4,5,[6, 7, 8], 9, 10, 11, 12, 13, 14], 15, 16],
		flattenedArray;

		it('on an array that contains arrays inside of it, flatten all arrays to a single array containing all values', function(){
			flattenedArray = numbers.flatten();

			expect(flattenedArray).to.have.length(16);

			expect(flattenedArray).to.contain(1);
			expect(flattenedArray).to.contain(4);
			expect(flattenedArray).to.contain(6);
			expect(flattenedArray).to.contain(9);

		});
		
	})
})