package main

import (
	"fmt"
	"net/http"
)

func main() {
	getCount := 0
	postCount := 0
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		if r.Method == "GET" {
			getCount++
			w.Write([]byte(fmt.Sprint(getCount))) // write response json
			return
		} else {
			w.Write([]byte(fmt.Sprint(postCount)))
			postCount++
		}
	})

	fmt.Println("Server started on port 8000")
	err := http.ListenAndServe(":8000", nil)
	if err != nil {
		panic(err)
	}
}
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
