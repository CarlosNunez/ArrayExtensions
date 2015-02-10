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
	  	it( 'should execute function returning a string for each object in array', function(){
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
		
  	})

  	describe( '#where', function(){
  		var people = [ 
		    {name: 'pedro', age: 29, skills: ['C#', 'Asp.Net', 'OOP'] },
		    {name: 'juan', age: 23, skills: ['PHP', 'Drink tea']  },
		    {name: 'pablo', age: 26, skills: ['RoR', 'HTML/CSS'] }
		    ];

		it('Shouldreturn devs without the PHP skills', function(){   
		    var peopleWithOOP = [],
		    pedro,
		    pablo;
			people.where(function(dev){
				var skills = dev.skills.where(function(skill){ return skill === 'PHP'; });

				if( skills.length === 0 ) {
					peopleWithOOP.push(dev.name);
				}
			});

			pedro = peopleWithOOP[0].name;
			pablo = peopleWithOOP[1].name;
	
		});

  	})

  	// decribe( '#')

})