# frozen_string_literal: true

module Admin
  class FeedsController < Admin::AdminController
    def support
      render json: {
        title: "Support Data Feed",
        data: "Sample data"
      }
    end
  end
end 