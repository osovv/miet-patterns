require 'singleton'

class BuiltInSingleton
  include Singleton
end

# builtin_singleton = BuiltInSingleton.new
#
# Throws:
# singleton.rb:8:in `<main>': private method `new' called for BuiltInSingleton:Class (NoMethodError)


# Always will be the same
puts BuiltInSingleton.instance.object_id
puts BuiltInSingleton.instance.object_id


# Very basic implementation
class ClassicSingleton
  @instance = new

  def self.new(*args)
    raise TypeError, "can't create new instance of ClassicSingleton"
  end

  def self.instance
    @instance
  end
end

# classic_singleton = ClassicSingleton.new
#
# Throws:
# singleton.rb:24:in `new': can't create new instance of ClassicSingleton (TypeError)

# Always will be the same
puts ClassicSingleton.instance.object_id
puts ClassicSingleton.instance.object_id


class AnotherSingleton
  class << self
    def instance
      @instance ||= new
    end

    private :new
  end
end

# another_singleton = AnotherSingleton.new
#
# Throws:
# singleton.rb:53:in `<main>': private method `new' called for AnotherSingleton:Class (NoMethodError)

# Always will be the same
puts AnotherSingleton.instance.object_id
puts AnotherSingleton.instance.object_id
