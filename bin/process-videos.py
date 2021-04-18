#!/usr/bin/env python
# Helper script to build <video> templates from a CSV.
#
# Expects "data.csv" to look like this:
#
# 1	462484493	440	https://i.vimeocdn.com/video/993189023_480.jpg
# 3	462484609	360	https://i.vimeocdn.com/video/993189982_480.jpg
#
# Columns are: page #, video ID, video width, video thumbnail URL
#
# Outputs video tags to copy into zine HTML.

import csv

with open("data.csv") as csv_file:
    rows = csv.reader(csv_file, delimiter=' ')
    for row in rows:
        print("{{< top-aligned-video id=\"" + row[1] + "\" height=\"" + row[2] + "\" img=\"" + row[3] + "\" >}}")
