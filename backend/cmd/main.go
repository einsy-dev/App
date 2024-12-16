package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	getCount := 0
	postCount := 0
	port := os.Getenv("SERVER_PORT")
	if port == "" {
		port = "8000"
	}
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		enableCors(&w)

		if r.Method == "GET" {
			getCount++
			w.Write([]byte(fmt.Sprint(getCount))) // write response json
			return
		} else {
			postCount++
			w.Write([]byte(fmt.Sprint(postCount)))
		}
	})

	fmt.Printf("Server started on port %s\n", port)
	err := http.ListenAndServe(fmt.Sprint(":", port), nil)
	if err != nil {
		panic(err)
	}
}
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
