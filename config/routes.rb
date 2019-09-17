Rails.application.routes.draw do
  post '/auth/login', to: 'authentication#login'
  resources :users do
    resources :reviews
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end