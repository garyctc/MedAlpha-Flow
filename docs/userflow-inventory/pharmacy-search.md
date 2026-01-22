# Pharmacy Search Flow

Discovery flow for finding nearby pharmacies via map or list view.

## Flow Summary

Entry (Home promo or Prescription flow) → Pharmacy Map → Browse (Map pin or List) → Pharmacy Detail → Action (Call/Directions/Select)

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> entry-point

entry-point: Entry point? {
  shape: diamond
  style.fill: "#FFCCCB"
}

entry-point -> from-home: Home promo
entry-point -> from-prescription: Prescription flow

# From Home
from-home: Tap pharmacy promo card {
  shape: rectangle
  style.fill: "#ADD8E6"
}

from-home -> pharmacy-map

# From Prescription
from-prescription: Tap "Local Pharmacy" option {
  shape: rectangle
  style.fill: "#ADD8E6"
}

from-prescription -> pharmacy-map

# Pharmacy Map View
pharmacy-map: Pharmacy Map {
  shape: document
  style.fill: "#90EE90"
}

pharmacy-map -> view-decision

view-decision: How to browse? {
  shape: diamond
  style.fill: "#FFCCCB"
}

view-decision -> tap-pin: Tap map pin
view-decision -> tap-list: View list

# Map Pin Selection
tap-pin: Tap pharmacy pin on map {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-pin -> pharmacy-detail

# List View
tap-list: Tap "View List" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

tap-list -> pharmacy-list

pharmacy-list: Pharmacy List {
  shape: document
  style.fill: "#90EE90"
}

pharmacy-list -> select-pharmacy

select-pharmacy: Select pharmacy from list {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-pharmacy -> pharmacy-detail

# Pharmacy Detail
pharmacy-detail: Pharmacy Detail {
  shape: document
  style.fill: "#90EE90"
}

pharmacy-detail -> detail-action

detail-action: User action? {
  shape: diamond
  style.fill: "#FFCCCB"
}

detail-action -> call-pharmacy: Call
detail-action -> get-directions: Directions
detail-action -> select-for-order: Select for order

call-pharmacy: Tap "Call" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

call-pharmacy -> done

get-directions: Tap "Directions" {
  shape: rectangle
  style.fill: "#ADD8E6"
}

get-directions -> done

select-for-order: Select as delivery pharmacy {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-for-order -> return-to-prescription

return-to-prescription: Return to prescription flow {
  shape: rectangle
  style.fill: "#ADD8E6"
}

return-to-prescription -> done

# End
done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
