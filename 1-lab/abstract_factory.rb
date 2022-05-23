class Driver
  def category
    raise 'Not implemented'
  end
end

class TaxiDriver < Driver
  def category
    :A
  end
end

class BusDriver < Driver
  def category
    :B
  end
end

class Passenger
  def description
    raise 'Not implemented'
  end
end

class TaxiPassenger < Passenger
  def description
    'Taxi passenger'
  end
end

class BusPassenger < Passenger
  def description
    'Bus passenger'
  end
end

class Factory
  def create_driver
    raise 'Not implemented'
  end

  def create_passengers
    raise 'Not implemented'
  end
end

class BusFactory < Factory
  def initialize
    super
    @passengers_count = 30
  end

  def create_driver
    BusDriver.new
  end

  def create_passengers
    Array.new(@passengers_count) { BusPassenger.new }
  end
end

class TaxiFactory < Factory
  def initialize
    super
    @passengers_count = 4
  end

  def create_driver
    TaxiDriver.new
  end

  def create_passengers
    Array.new(@passengers_count) { TaxiPassenger.new }
  end

end

class Vehicle
  def initialize
    @driver = nil
    @passengers = []
    @passengers_limit = 0
    @category = nil
  end

  def assign_driver(driver)
    if @driver.nil?
      @driver = driver
    else
      raise "Can't assign more than one driver, #{@driver} already assigned"
    end
  end

  def load_passenger(passenger)
    if !passenger_loadable?
      raise "Can't load more than #{@passengers_limit} passengers"
    else
      @passengers << passenger
    end
  end

  def load_passengers(passengers)
    if !passengers_loadable?(passengers)
      raise "Can't load more than #{@passengers_limit} passengers"
    else
      @passengers = @passengers.concat(passengers)
    end
  end

  def valid?
    valid_driver? && !@passengers.empty?
  end

  def information
    [
      "Driver: #{@driver}",
      "Passengers count: #{@passengers.size}"
    ]
  end

  def unassign_driver
    @driver = nil
  end

  def unload_passengers
    @passengers = []
  end

  private

  def passengers_limit_exceeded?
    (@passengers.size >= @passengers_limit)
  end

  def passengers_loadable?(passengers)
    !(passengers_limit_exceeded? || @passengers.size + passengers.size > @passengers_limit)
  end

  def passenger_loadable?
    !(passengers_limit_exceeded? || @passengers.size + 1 > @passengers_limit)
  end

  def valid_driver?
    !@driver.nil? && @driver.category == @required_category
  end
end

class Taxi < Vehicle
  def initialize
    super
    @passengers_limit = 4
    @required_category = :A
  end
end

class Bus < Vehicle
  def initialize
    super
    @passengers_limit = 30
    @required_category = :B
  end
end

taxi_factory = TaxiFactory.new
taxi_driver = taxi_factory.create_driver
taxi_passengers = taxi_factory.create_passengers
taxi = Taxi.new

puts "Taxi valid?: #{taxi.valid?}"
puts taxi.information
taxi.assign_driver(taxi_driver)
taxi.load_passengers(taxi_passengers)
puts "Taxi valid?: #{taxi.valid?}"
puts taxi.information
puts

bus_factory = BusFactory.new
bus_driver = bus_factory.create_driver
bus_passengers = bus_factory.create_passengers
bus = Bus.new

puts "Bus valid?: #{bus.valid?}"
puts bus.information
bus.assign_driver(bus_driver)
bus.load_passengers(bus_passengers)
puts "Bus valid?: #{bus.valid?}"
puts bus.information
