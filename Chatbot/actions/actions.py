# This files contains your custom actions which can be used to run
# custom Python code.
#
# See this guide on how to implement these action:
# https://rasa.com/docs/rasa/custom-actions


# This is a simple example for a custom action which utters "Hello World!"

from typing import Any, Text, Dict, List
import datetime
import calendar
from rasa_sdk import Action, Tracker
from rasa_sdk.events import SlotSet, EventType, Form, FollowupAction
from rasa_sdk.executor import CollectingDispatcher
from rasa_sdk.types import DomainDict
import json
import time

def read_menu():
    return json.load(open('data/menu.json'))["items"]

def read_opening_hours():
    return json.load(open('data/opening_hours.json'))

class ActionIsRestaurantOpen(Action):

    def name(self) -> Text:
        return "is_restaurant_open"

    async def run(self,
                  dispatcher: CollectingDispatcher,
                  tracker: Tracker,
                  domain: Dict[Text, Any]) -> List[EventType]:

        result = ''
        when = next(tracker.get_latest_entity_values("when"), None)

        if when is None:
            return[FollowupAction(name = 'when_is_restaurant_open')]

        opening_hours = read_opening_hours()
        opening_hours = opening_hours['items']

        date = datetime.datetime.now()
        day = date.date().strftime("%A")
        hour = date.hour

        open_hour = opening_hours[day]["open"]
        close_hour = opening_hours[day]["close"]

        if when == 'now':
            if close_hour > int(hour) > open_hour:
                result = "Yes, we are open now"
            else:
                result = "No, we are closed now"

        if when == 'today':
            if close_hour != 0 and open_hour != 0:
                result = "Yes, we are open today"
            else:
                result = "No, we are closed today"

        dispatcher.utter_message(text=result)

        return []


class ActionWhenRestaurantIsOpen(Action):
    def name(self) -> Text:
        return "when_is_restaurant_open"

    async def run(self,
                  dispatcher: CollectingDispatcher,
                  tracker: Tracker,
                  domain: Dict[Text, Any]) -> List[EventType]:

        opening_hours = read_opening_hours()
        opening_hours = opening_hours['items']
        answer = "Restaurant opening hours:  \n"
        for day, hours in opening_hours.items():
            if hours['open'] == 0 and hours['close'] == 0:
                answer += day + ' : restaurant is closed,\n'
            else:
                answer += day + ': ' + str(hours['open']) + ' - ' + str(hours['close']) + ',\n'

        dispatcher.utter_message(text = answer)

        return []

class ShowMenu(Action):

    def name(self) -> Text:
        return "show_menu"

    async def run(self,
                  dispatcher: CollectingDispatcher,
                  tracker: Tracker,
                  domain: Dict[Text, Any]) -> List[EventType]:

        menu = read_menu()
        result="Menu: \n"

        for item in menu:
            result += item["name"]+" "+str(item["price"])+" "+str(item["preparation_time"])+"\n"

        dispatcher.utter_message(text=result)

        return []
