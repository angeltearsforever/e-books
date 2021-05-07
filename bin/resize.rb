#!/usr/bin/env ruby
# Resizes all images to 50% in a directory (DESTRUCTIVE!)

dir = ARGV[0]

if not dir or dir == ""
  puts "ERROR: no dir provided"
  exit
end

imgs = Dir.glob "#{dir}/*.{png,jpg,jpeg}"
imgs.each { |i| puts "* #{i}" }
STDOUT.flush

puts "^ Resize these files to 50%? (y/n): "
answer = STDIN.gets.chomp

if not ["y", "Y"].include?(answer)
  puts "exiting..."
  exit
end

c = 1
t = imgs.size

imgs.each do |img|
  dirname = File.dirname(img)
  ext = File.extname(img)
  basename = File.basename(img, ext)
  newname = "#{dirname}/#{basename}-resized#{ext}"

  puts "(#{c}/#{t}) #{img} => #{newname}..."
  system("/usr/local/bin/convert -resize 50% '#{img}' '#{newname}'")

  c += 1
end
