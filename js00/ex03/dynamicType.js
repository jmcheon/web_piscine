const dynamicType = {
	number : null,
	put : function(number) {
		this.number = number;
	},
	change : function(type) {
		if (this.number != null) {
			if (type === 'String')
				this.number = String(this.number);
			else if (type === 'Number')
				this.number = Number(this.number);
			else if (type === 'Object')
				this.number = {number: Number(this.number)};
			else if (type === 'Array')
				this.number = [this.number];
		}
	},
	printType : function() {
		console.log(typeof this.number, this.number);
	}
};

const type = dynamicType;

type.put(42);
type.change('String');
type.printType();
type.change('Number');
type.printType();
type.change('Array');
type.printType();
type.change('Object');
type.printType();
