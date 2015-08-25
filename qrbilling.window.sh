window_root "./"
new_window "start"

split_v 30
split_h 66
split_h 50

run_cmd "ionic serve" 1  # runs in pane 1
run_cmd "gulp watch" 2    # runs in active pane

run_cmd "cd ~/dev/qr-billing-web/" 3    # runs in active pane
run_cmd "grunt server" 3    # runs in active pane

# Paste text
#send_keys "top"    # paste into active pane
#send_keys "date" 1 # paste into pane 1

# Set active pane.
select_pane 0
