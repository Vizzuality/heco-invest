class GeneratePassword
  attr_accessor :length

  def initialize(length)
    @length = length
  end

  def call
    num_letters = Random.new.rand 2..(length - 1)
    num_capital_letters = Random.new.rand 1..(num_letters - 1)

    (random(("a".."z").to_a, num_letters - num_capital_letters) +
      random(("A".."Z").to_a, num_capital_letters) +
      random((0..9).to_a, length - num_letters)).shuffle.join
  end

  private

  def random(from, length)
    length.times.map { from.sample }
  end
end
