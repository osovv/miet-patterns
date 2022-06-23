class Corrector
  def execute(context)
    raise 'Not implemented'
  end
end

class TabCorrector < Corrector
  def execute(context)
    while context.include?('  ')
      context = context.gsub('  ', ' ')
    end

    while context.include?("\t\t")
      context = context.gsub("\t\t", "\t")
    end

    context
  end
end

class DashCorrector < Corrector
  def execute(context)
    context.gsub('-', '—')
  end
end

class QuotesCorrector < Corrector
  def execute(context)
    counter = 0
    while context.include?('"')
      if left_bracket?(counter)
        context = context.sub('"', '«')
      else
        context = context.sub('"', '»')
      end

      counter += 1
    end

    context
  end

  def left_bracket?(counter)
    counter % 2 == 0
  end
end

class ExtraSpaceCorrector < Corrector
  def execute(context)
    context
      .gsub("( ", "(")
      .gsub(" )", ")")
      .gsub(" ,", ",")
      .gsub(" .", ".")
  end
end

class NewLineCorrector < Corrector
  def execute(context)
    while context.include?('\n\n')
      context = context.gsub('\n\n', '\n')
    end

    while context.include?("\n\r\n\r")
      context = context.gsub("\n\r\n\r", "\n\r")
    end

    while context.include?('\r\n\r\n')
      context = context.gsub('\r\n\r\n', '\r\n')
    end

    while context.include?("\n\t")
      context = context.gsub("\n\t", "\n")
    end

    context
  end
end

tab = TabCorrector.new
r1 = tab.execute('a          b')
puts r1

dash = DashCorrector.new
r2 = dash.execute('a - b - c')
puts r2

quote = QuotesCorrector.new
r3 = quote.execute('""""')
puts r3

extra_space = ExtraSpaceCorrector.new
r4 = extra_space.execute('Hello , my name is ( Ruby ) .')
puts r4

new_line = NewLineCorrector.new
r5 = new_line.execute('\n\n\r\n\t\t\n\t\r')
puts r5
