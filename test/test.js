var arrayExtensions = require('../ArrayExtensions.js')
var chai = require('chai');

chai.config.includeStack = true;

assert = chai.assert;

describe( 'Array', function(){
  	describe( '#indexOf()', function(){
	    it( 'should return -1 when the value is not present', function(){
	      assert.equal(-1, [1,2,3].indexOf(5));
	      assert.equal(-1, [1,2,3].indexOf(0));
	    })
  	})

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

		  	assert.equal( strings.length, people.length );

		 	assert.equal( pedro, 'pedro is 19 years old' );
		 	assert.equal( pablo, 'pablo is 16 years old' );
		 	assert.equal( topo, 'topo is 18 years old' );	
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

		 	assert.equal( peopleWithOOP.length, 2 );
		 	assert.equal( pedro,"pedro" );
		 	assert.equal( pablo, "pablo" );	
	
		});

  	});

  	describe( '#any', function(){
  		var juan =  {name: 'juan', age: 23, skills: ['PHP', 'Drink tea'] },
  		result;

		it('Taking a function as parameter should return true finding the defined value', function(){
			result = juan.skills.any( function(skill){ 
				return skill === 'PHP'
			});

			assert.equal(result, true);
		});

		it('Taking a string as a parameter should return true finding the defined value', function(){
			result = juan.skills.any( 'PHP' );

			assert.equal(result, true);
		});

		it('Taking a function as parameter should return false not finding the defined value', function(){
			result = juan.skills.any( function(skill){ 
				return skill === 'OOP' 
			})

			assert.equal(result, false); 
		});

		it('Takin a string as parameter should return false on not finding the defined value', function(){
			result = juan.skills.any( 'OOP' );

			assert.equal(result, false);
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
			assert.equal(names.length, 3);
			assert.equal(names[0], 'pedro');
			assert.equal(names[1], 'pablo');
			assert.equal(names[2], 'topo');
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

			assert.equal( threeChildren.length, 3 );
		});

		it( 'Is given 3 and a function that specifies being female as parameter all female, takes exactly 3 elements from the original array',function() {
			var threeChildren = [];
			threeChildren = children.take(3, function(x) {
				return x.sex === 'f'
			});

			assert.equal( threeChildren.length, 3 );
			assert.equal( threeChildren[0].sex, 'f' );
			assert.equal( threeChildren[1].sex, 'f' );
			assert.equal( threeChildren[2].sex, 'f' );
		});	

		it( 'Is given 5 and a function that specifies being male as a parameter, takes 3 elements as there are only 3 male children in the original array', function() {
			var threeChildren = [];
			threeChildren = children.take( 5, function(x) {
				return x.sex === 'm'
			});

			assert.equal( threeChildren.length, 3 );
			assert.equal( threeChildren[0].sex, 'm' );
			assert.equal( threeChildren[1].sex, 'm' );
			assert.equal( threeChildren[2].sex, 'm' );

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
			var result = [];

			result = children.skip(3);

			assert.equal( result.length, 6 );
			assert.equal( result[0].name, 'yadi' );
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

			assert.equal( firstChild.name, 'ana' );
		});

		it('Is given function that defines a condition, returns the first element that meets the condition in the array', function(){
			firstChild = children.first( function( x ){ 
				return x.sex === 'm'
			});

			assert.equal( firstChild.name, 'fosto' );
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
			firstChild = children.last();

			assert.equal( firstChild.name, 'martin' );
		});

		it('Is given function that defines a condition, returns the last element that meets the condition in the array', function(){
			firstChild = children.last( function( x ){ 
				return x.sex === 'f'
			});

			assert.equal( firstChild.name, 'auro' );
		});
	});

	describe('#count', function(){
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

		it('Given no parameter, returns the total count of elements', function(){
			count = children.count();

			assert.equal(count, 9)
		})

		it('Given a function as aprameter will return the number of elements that satisfy the function condition', function(){
			count = children.count( function(x) { 
				return x.sex === 'f'
			});

			assert.equal(count, 5);
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

			assert.equal(index, 5);
		});

		it('Given a function as parameter returns the -1 when no element satisfies the specification', function() {
			index = children.index( function(x) {
				return x.name === 'mark';
			})

			assert.equal(index, -1);
		});

		it('Given a value as parameter will return the index of the value that matches', function() {
			index = numbers.index(7);

			assert.equal(index, 3);
		});

	});

	describe( '#pluck', function(){
  		var people = [ 
		    {name: 'pedro', age: 19 },
		    {name: 'pablo', age: 16 },
		    {name: 'topo', age: 18 }
		],
		names= [];

		it('Is given the name of a property, returns an array of said property', function(){
			names = people.pluck('name');

			assert.equal(names.length, 3);
			assert.equal(names[0], 'pedro');
			assert.equal(names[1], 'pablo');
			assert.equal(names[2], 'topo');
		});
  	});


})