#!/bin/bash

board=('0' '1' '2' '3' '4' '5' '6' '7' '8' '9')
win=2
player_num=1
char='a'
is_number_in_range='^[1-9]$'
function show_board {
    clear
	printf "\n\nKolko i krzyzyk\n\n"
	printf "\n\nGracz 1 to X, Gracz 2 to O\n\n"
	printf "\nPowodzenia! :)\n\n"
	printf "     |     |     \n"
    printf "  %c  |  %c  |  %c \n" "${board[1]}" "${board[2]}" "${board[3]}"

    printf "_____|_____|_____\n"
    printf "     |     |     \n"

    printf "  %c  |  %c  |  %c \n" "${board[4]}" "${board[5]}" "${board[6]}"

    printf "_____|_____|_____\n"
    printf "     |     |     \n"

    printf "  %c  |  %c  |  %c \n" "${board[7]}" "${board[8]}" "${board[9]}"

    printf "     |     |     \n\n"
}

function check_result {
	if [[ "${board[1]}" == "${board[2]}" ]] && [[ "${board[2]}" == "${board[3]}" ]]; then
	win=1
	echo "$win win"
	elif [[ "${board[4]}" == "${board[5]}" ]] && [[ "${board[5]}" == "${board[6]}" ]]; then
	win=1
	echo "$win win"
	elif [[ "${board[7]}" == "${board[8]}" ]] && [[ "${board[8]}" == "${board[9]}" ]]; then
	win=1
	echo "$win win"
	elif [[ "${board[1]}" == "${board[4]}" ]] && [[ "${board[4]}" == "${board[7]}" ]]; then
	win=1
	echo "$win win"
	elif [[ "${board[2]}" == "${board[5]}" ]] && [[ "${board[5]}" == "${board[8]}" ]]; then
	win=1
	echo "$win win"
	elif [[ "${board[3]}" == "${board[6]}" ]] && [[ "${board[6]}" == "${board[9]}" ]]; then
	win=1
	echo "$win win"
	elif [[ "${board[1]}" == "${board[5]}" ]] && [[ "${board[5]}" == "${board[9]}" ]]; then
	win=1
	echo "$win win"
	elif [[ "${board[3]}" == "${board[5]}" ]] && [[ "${board[5]}" == "${board[7]}" ]]; then
	win=1
	echo "$win win"
	elif [[ "${board[1]}" != "1" ]] && [[ "${board[2]}" != "2" ]] && [[ "${board[3]}" != "3" ]] && [[ "${board[4]}" != "4" ]] && [[ "${board[5]}" != "5" ]] && [[ "${board[6]}" != "6" ]] && [[ "${board[7]}" != "7" ]] && [[ "${board[8]}" != "8" ]] && [[ "${board[9]}" != "9" ]]; then
	win=0
	else
	win=2
	fi
}

while [ $win -eq 2 ]; do
	show_board
	player_num=$((player_num%2))
	if [ "$player_num" -eq 1 ]; then
		player_num=1
		else 
		player_num=2
	fi
	read -p "Gracz $player_num,podaj numer pola: " choice
	while [[ ${board[$choice]} == 'X' ]] || [[ ${board[$choice]} == 'O' ]] || [[ ! "${board[$choice]}" =~ $is_number_in_range ]]; do
		read -p "To pole jest niepoprawne. Wybierz inne. Podaj numer pola: " choice
	done
	if [ "$player_num" -eq 1 ]; then
		char='X'
	else
		char='O'
	fi
	if [ "$choice" -eq 1 ]; then
		board[1]=$char
	elif [ "$choice" -eq 2 ]; then
		board[2]=$char
	elif [ "$choice" -eq 3 ]; then
		board[3]=$char
	elif [ "$choice" -eq 4 ]; then
		board[4]=$char
	elif [ "$choice" -eq 5 ]; then
		board[5]=$char
	elif [ "$choice" -eq 6 ]; then
		board[6]=$char
	elif [ "$choice" -eq 7 ]; then
		board[7]=$char
	elif [ "$choice" -eq 8 ]; then
		board[8]=$char
	elif [ "$choice" -eq 9 ]; then
		board[9]=$char
	else
		read -p "Niepoprawny ruch, podaj numer pola jeszcze raz: " choice
		player_num=$((player_num - 1))
	fi
	check_result
	player_num=$((player_num + 1))
done
show_board
if [ "$win" -eq 1 ]; then
	player_num=$((player_num - 1))
	echo "Gracz $player_num wygral!!! Gratulacje :)"
fi
if [ "$win" -eq 0 ]; then
	player_num=$((player_num - 1))
	echo "Remis - brak zwyciezcy"
fi
