require 'observer'

class Discipline
  include Observable

  def initialize(title, teachers)
    @title = title
    @week_no = 1
    @teachers = teachers
    @current_week_teachers = []
  end

  def finish_week
    # We don't really care how current_week_teachers are filled and how reports are saved
    # DB.save(@title, @week_no, @current_week_teachers)
    changed
    notify_observers(@title, @week_no, @current_week_teachers)
    @week_no += 1
  end

  def run
    loop do
      @current_week_teachers = @teachers.sample(@teachers.size - rand((@teachers.size / 2).ceil))
      finish_week
      sleep 1
    end
  end
end

class WarnMissingReport
  def initialize(discipline, teachers)
    @teachers = teachers
    discipline.add_observer(self)
  end

  def update(discipline_title, week_no, teachers_with_report)
    teachers_without_report = @teachers - teachers_with_report
    teachers_without_report.each do |teacher|
      puts "Discipline: #{discipline_title} | Week \##{week_no} | Teacher #{teacher} missed the report"
    end
  end
end

TEACHERS = %w[John Lucas Jack Lincoln Benjamin].freeze

discipline = Discipline.new('Design Patterns', TEACHERS)
WarnMissingReport.new(discipline, TEACHERS)
discipline.run
