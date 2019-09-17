class ReviewsController < ApplicationController
  before_action :set_review, only: [:show, :update, :destroy]
  #  before_action :authorize_request
  
  # GET /users/1/reviews
  def index
    @user = User.find(params[:user_id])
    @reviews = @user.reviews

    render json: @reviews
  end

  # GET /users/1/reviews/1
  def show
    render json: @review, status: :ok
  end

  
  def create
    @user = User.find(params[:user_id])
    @review = Review.new(review_params)
    
    if @review.save
      @user.reviews.push(@review)
      render json: @review, status: :created
    else
      render json: { errors: @review.errors }, status: :unprocessable_entity
      
    end
  end

  # PATCH/PUT /users/1/reviews/1
  def update
    if @review.update(review_params)
      render json: @review
    else
      render json: @review.errors, status: :unprocessable_entity
    end
  end

  # DELETE /users/1/reviews/1
  def destroy
    @review.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_review
      @review = Review.find(params[:id])
    end

    # Only allow a trusted parameter "white list" through.
    def review_params
      params.require(:review).permit(:comment, :user_id)
    end
end
