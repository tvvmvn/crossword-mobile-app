import { StyleSheet, View } from "react-native";

export function BoardGrid({ children }: any) {
  return (
    <View style={styles.grid}>
      {children}
    </View>
  )
}

export function BoardRow({ key, children }) {
  return (
    <View key={key}>
      {children}
    </View>
  )
}

export function BlackCell({ key }) {
  return (
    <View key={key} />
  )
}

export function WhiteCell() {

}

const styles = StyleSheet.create({
  grid: {}
})