import React, { Component } from 'react'

import Restaurant from '../components/Restaurant'
import Reviews from '../components/Reviews'
import ReviewForm from '../components/ReviewForm'
import restaurants from '../constants/restaurants'
import reviews from '../constants/reviews'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      errors: {},
      restaurants,
      reviews,
      selectedId: restaurants[0].id,
      ratingOptions: ['1','2','3','4','5'],
      ratingSelected: "",
      userName: '',
      comment: ''

    }
    this.restaurantClick = this.restaurantClick.bind(this)
    this.validateCommentChange = this.validateCommentChange.bind(this)
    this.handleCommentChange = this.handleCommentChange.bind(this)
    this.validateUserNameChange = this.validateUserNameChange.bind(this)
    this.handleUserNameChange = this.handleUserNameChange.bind(this)
    this.handleRatingSelection = this.handleRatingSelection.bind(this);
    this.validateRatingSelection = this.validateRatingSelection.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleFormSubmit=this.handleFormSubmit.bind(this);
  }

  trackConsumption(submission) {
    this.setState({ reviews: this.state.reviews.concat(submission) })
  }

  restaurantClick(event) {
    event.preventDefault()
    this.setState({selectedId: event.target.id})
  }

  selectedRestaurant() {
    return this.state.restaurants.find((restaurant) =>
      (restaurant.id === this.state.selectedId)
    )
  }

  validateCommentChange(comment) {
    if (comment === '' || comment === ' ') {
      let newError = { comment: 'Comment may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.comment
      this.setState({ errors: errorState })
      return true
    }
  }

  validateUserNameChange(userName) {
    if (userName === '' || userName === ' ') {
      let newError = { userName: 'Comment may not be blank.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.userName
      this.setState({ errors: errorState })
      return true
    }
  }
  handleCommentChange(event) {
    console.log(event.target.value)
    this.validateCommentChange(event.target.value)
    this.setState({comment: event.target.value })
  }
  handleUserNameChange(event) {
    console.log(event.target.value)
    this.validateUserNameChange(event.target.value)
    this.setState({userName: event.target.value })
  }

  handleRatingSelection(event) {
    this.validateRatingSelection(event.target.value)
    this.setState({ratingSelected: event.target.value })
  }

  validateRatingSelection(selection) {
    if (selection === '') {
      let newError = { ratingSelected: 'You must select a star.' }
      this.setState({ errors: Object.assign(this.state.errors, newError) })
      return false
    } else {
      let errorState = this.state.errors
      delete errorState.ratingSelected
      this.setState({ errors: errorState })
      return true
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    if (
      this.validateCommentChange(this.state.comment) &&
      this.validateUserNameChange(this.state.userName) &&
      this.validateRatingSelection(this.state.ratingSelected)
    ) {
      let userRating = parseInt(this.state.ratingSelected)*20
      console.log(this.state.ratingSelected)
      let formPayload = {
        restaurant_id: this.state.selectedId,
        rating: userRating,
        name: this.state.userName,
        content: this.state.comment
      };
      this.trackConsumption(formPayload);
      this.handleClearForm(event);
    }
  }

    handleClearForm(event) {
      event.preventDefault();
      console.log("handle clear form clicked")
      this.setState({
        errors: {},
        ratingSelected: "",
        userName: '',
        comment: ''
      })
    }

  render() {
    let restaurantComponents = restaurants.map((restaurant) => {
      return (
        <Restaurant key={restaurant.id}
          data={restaurant}
          isSelected={this.state.selectedId === restaurant.id}
          handleClick={this.restaurantClick}/>
      )
    })

    let relevantReviews = this.state.reviews.filter((review) =>
      (this.state.selectedId === review.restaurant_id)
    )

    return(
      <div>
        <div className="row">
          <div className="small-3 columns">
            <h1>Restaurant</h1>
            {restaurantComponents}
          </div>
          <div className="small-9 columns">
            <h2>Reviews for {this.selectedRestaurant().name}</h2>

            <Reviews data={relevantReviews} />
            <ReviewForm
              id={relevantReviews}
              handleFormSubmit={this.handleFormSubmit}
              handleClearForm={this.handleClearForm}
              handleCommentChange={this.handleCommentChange}
              commentContent={this.state.comment}
              handleUserNameChange={this.handleUserNameChange}
              userNameContent={this.state.userName}
              handleRatingSelection={this.handleRatingSelection}
              ratingSelected={this.state.ratingSelected}
              ratingOptions = {this.state.ratingOptions}
            />

          </div>
        </div>
      </div>
    )
  }
}

export default App
