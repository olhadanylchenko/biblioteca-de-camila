import React, { useState, useContext, useEffect } from "react";
import { Text, View, FlatList, StyleSheet } from "react-native";
import { fetchFromApi } from "../utils/api";

import { UserContext } from "../contexts/UserContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 22,
  },

  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  book: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

const Book = ({ title }) => (
  <View style={styles.book}>
    <Text style={styles.title}>{title}</Text>
  </View>
);

export default function Home({ navigation }) {
  const [books, setBooks] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const abortController = new AbortController();
    if (user) {
      async function getBook() {
        try {
          const books = await fetchFromApi("/books", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            signal: abortController.signal,
          });
          setBooks(books);
        } catch (err) {
          console.log(err);
        }
      }
      getBook();
      return () => {
        abortController.abort();
      };
    } else {
      navigation.navigate("Login");
    }
  }, [user && user.token]);

  const renderBook = ({ book }) => <Book title={book.title} />;

  return (
    <View style={styles.container}>
      <Text>HOME</Text>
      <FlatList
        data={books}
        renderBook={renderBook}
        keyExtractor={(book) => book._id}
      />
    </View>
  );
}
