# History View Flow

Timeline browsing of past appointments and prescriptions with search and filter capabilities.

## Flow Summary

History → Browse (Search/Filter/Scroll) → Select item → View detail (Appointment or Prescription) → Back to History

```d2
direction: down

# Start
start: Start {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}

start -> history-screen

# History Screen
history-screen: History {
  shape: document
  style.fill: "#90EE90"
}

history-screen -> browse-decision

browse-decision: How to browse history? {
  shape: diamond
  style.fill: "#FFCCCB"
}

browse-decision -> search-history: Search
browse-decision -> filter-history: Filter by type
browse-decision -> scroll-timeline: Scroll timeline

# Search Flow
search-history: Tap search input {
  shape: rectangle
  style.fill: "#ADD8E6"
}

search-history -> enter-search-query

enter-search-query: Enter search query {
  shape: rectangle
  style.fill: "#ADD8E6"
}

enter-search-query -> view-results

view-results: View filtered results {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-results -> select-item

# Filter Flow
filter-history: Tap filter tab (All/In-Person/Prescriptions/Video) {
  shape: rectangle
  style.fill: "#ADD8E6"
}

filter-history -> view-filtered

view-filtered: View filtered history {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-filtered -> select-item

# Scroll Timeline Flow
scroll-timeline: Scroll through timeline {
  shape: rectangle
  style.fill: "#ADD8E6"
}

scroll-timeline -> select-item

# Select Item
select-item: Tap history item {
  shape: rectangle
  style.fill: "#ADD8E6"
}

select-item -> item-type

item-type: Item type? {
  shape: diamond
  style.fill: "#FFCCCB"
}

item-type -> view-appointment: Appointment
item-type -> view-prescription: Prescription

# Appointment Detail
view-appointment: View appointment details {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-appointment -> appointment-detail

appointment-detail: Appointment Detail {
  shape: document
  style.fill: "#90EE90"
}

appointment-detail -> back-to-history

# Prescription Detail
view-prescription: View prescription details {
  shape: rectangle
  style.fill: "#ADD8E6"
}

view-prescription -> prescription-detail

prescription-detail: Prescription Detail {
  shape: document
  style.fill: "#90EE90"
}

prescription-detail -> back-to-history

# Back to History
back-to-history: Tap back {
  shape: rectangle
  style.fill: "#ADD8E6"
}

back-to-history -> history-screen

# End (via bottom nav)
history-screen -> done: Navigate away

done: End {
  shape: circle
  style.fill: "#000000"
  style.font-color: "#FFFFFF"
}
```
