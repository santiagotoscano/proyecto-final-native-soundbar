import { StyleSheet } from "react-native";
import colors from "../modules/colors";

export default StyleSheet.create({

  container: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 60,
    borderTopWidth: 1,
    borderTopColor: colors.b,
    flexDirection: 'row',
    alignItems: 'center'
  },
  
  trackArtworkContainer: {
    flex: 1,
    alignItems: 'center'
  },

  trackArtwork: {
    width: 45,
    height: 45,
    borderRadius: 5,
  },

  trackInfo: {
    flex: 2,
    marginLeft: 10,
  },

  trackInfoTitle: {
    color: colors.text.a,
    fontWeight: 'bold'
  },

  trackInfoSubtitle: {
    color: colors.text.a,
    fontSize: 12
  },

  trackController: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'space-around'
  }

})