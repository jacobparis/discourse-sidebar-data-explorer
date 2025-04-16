# frozen_string_literal: true

Discourse::Application.routes.draw do
  get '/admin/feeds/support' => 'admin/feeds#support', constraints: AdminConstraint.new
end 