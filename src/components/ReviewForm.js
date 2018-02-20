import React from 'react'
import TextField from './TextField';
import Select from './Select';

const ReviewForm = props =>{

  return(
    <form className="callout" onSubmit={props.handleFormSubmit}>

      <div className="row mbl">
        <div className="small-1 columns"><strong>Name</strong></div>
        <div className="small-11 columns">
          <TextField
            handlerFunction={props.handleUserNameChange}
            name="userName"
            content= {props.userNameContent}
          />
        </div>

        <div className="small-1 columns"><strong>Score</strong></div>
        <div className="small-11 columns">
          <Select
            handlerFunction={props.handleRatingSelection}
            name='rating'
            label='starts'
            options={props.ratingOptions}
            selectedOption={props.ratingSelected}
          />
        </div>

        <div className="small-1 columns"><strong>Review</strong></div>
        <div className="small-11 columns">
          <TextField
            handlerFunction={props.handleCommentChange}
            name="comment"
            content= {props.commentContent}


          />
        </div>
      </div>
      <div className="button-group">
        <button className="button" onClick={props.handleClearForm}>Clear</button>
        <input className="button" type="submit" value="Submit" />
      </div>
    </form>
  )
}

export default ReviewForm;
