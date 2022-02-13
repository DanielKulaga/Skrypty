require 'nokogiri'
require 'net/http'

def webcrawler
    smartphones = Array.new

    key_word = ARGV[0]
    start_page = 1
    last_page = 2

    for page in start_page..last_page do
        url =  URI("https://www.amazon.pl/gp/bestsellers/electronics/20788267031/ref=zg_bs_pg_#{page}?ie=UTF8&pg=#{page}")
        page = Net::HTTP.get(url)
        parsed_page = Nokogiri::HTML.parse(page)
        smartphone_items = parsed_page.css('div.p13n-grid-content')
        smartphone_items.each do |item|
            title1 = item.css('div._p13n-zg-list-grid-desktop_truncationStyles_p13n-sc-css-line-clamp-3__g3dy1').text

            smartphone = {
                    title: title1,
                    price: item.css('span.a-size-base').text,
                    ratings: item.css('span.a-icon-alt').text
            }

            if title1.include? key_word
                smartphones << smartphone
			end
        end
    end
    if smartphones.empty?
        puts "Nie znaleziono"
    else 
        puts smartphones
    end
end

webcrawler