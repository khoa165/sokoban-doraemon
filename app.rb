require "sinatra"
require "sinatra/content_for"
require "sinatra/reloader" if development?
require "pry-byebug"
require "better_errors"

configure :development do
  use BetterErrors::Middleware
  BetterErrors.application_root = File.expand_path(__dir__)
end

require_relative "config/application"

set :views, (proc { File.join(root, "app/views") })
set :public_folder, File.dirname(__FILE__) + '/app/public'
set :bind, '0.0.0.0'

get '/' do
  erb :index
end

post '/chosen_theme' do
  redirect "/sokoban/#{params["theme"]}"
end

get '/sokoban/:theme' do
  @theme = params["theme"]
  erb :level
end

post '/sokoban/:theme/chosen_level' do
  redirect "/sokoban/#{params["theme"]}/#{params["level"]}"
end

get '/sokoban/:theme/:level' do
  @theme = params["theme"]
  @level = params["level"]
  erb :"game#{@level}"
end
