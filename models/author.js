const mongoose  = require("mongoose");
const { DateTime } = require('luxon');
const Schema = mongoose.Schema

const AuthorSchema = new Schema(
    {
        first_name: {type: String, required: true, maxLength: 100},
        family_name: {type: String, required: true, maxLength: 100},
        date_of_birth: {type: Date},
        date_of_death: {type: Date},
    }
);

// Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function(){ 
    return this.family_name + ', ' + this.first_name;
});

// Virtual for author's lifespan
AuthorSchema
.virtual('lifespan')
.get(function(){
    var lifetime_string = '';
    if(this.date_of_birth){
        lifetime_string = DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED);
    }
    lifetime_string += ' - ';
    if(this.date_of_death){
        lifetime_string += DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED);
    }
    return lifetime_string;
    
    // return ((this.formatted_date_of_birth) +' - '+ (this.formatted_date_of_death));
    // return (this.date_of_death.getYear() - this.date_of_birth.getYear()).toString(); 
});

AuthorSchema
.virtual('formatted_date_of_birth')
.get(function(){
    return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema
.virtual('formatted_date_of_death')
.get(function(){
    return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : '';
});

AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
    return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
  });
  
  AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
    return DateTime.fromJSDate(this.date_of_death).toISODate(); //format 'YYYY-MM-DD'
  });

// Virtual for author's URL
AuthorSchema
.virtual('url')
.get(function() {
    return'/catalog/author/' + this._id; 
});

// Export model
module.exports = mongoose.model('Author', AuthorSchema);
