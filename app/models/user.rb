class User < ActiveRecord::Base
  has_many :tasks

  validates :username, presence: true, uniqueness: { case_sensitive: false, message: "This username is already taken" }, length: { maximum: 15,
    too_long: "Username must have %{count} or fewer characters.", minimum: 5, too_short: "Username must have at least %{count} characters." }
  validates :email, presence: true, uniqueness: { case_sensitive: false, message: "This email is already used for another account." }, format: { with: /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i, message: "Your email is not valid." }
  validates :password, presence: true, format: { with: /\A(?=.*[a-zA-Z])(?=.*[0-9]).{6,15}\z/, message: "Password must be 6 to 15 characters and include at least one number and one letter." }
end
