# Music-Graph
An open source graph representation of most genres and styles found on popular, classical and folk music. Usually used to compute similarity (by distance) between tracks using their sets of genres/styles.

# Usage
Just load Draw Graph.html into any browser.

Any modifications to the graph can be added to 'music_graph_descriptors_xxx_user.js', while 'music_graph_descriptors_xxx.js' stores all default values. Obviously both can be edited, but future updates may replace the default ones... so user's additions are easier to maintain if stored separately (otherwise you will have to diff. merge). 

Both files include multiple comments, how to's and examples for almost any graph modification and configuration imaginable. From node shapes, to colors, distances, etc.

# WIP
Note this graph is an ongoing project which may take an undefined ammount of time to be complete, if that ever happens. Mapping all musical genres and styles, while also covering alternative terms and substitutions is a hard task.

# Real World Implementation
As is, the provided files serve as a framework for other projects and as a way to render the relations amongs the different musical genres and styles. But it can be used to compute the distance (similarity) between 2 points (genres) or the mean distance (total similarity) between 2 sets of points (2 sets of tags). Therefore it allows to compared directly a reference track against a library, using their tags, and find the most similar tracks (*). You can find such examples in these foobar2000's scripts:

1. [Search-by-Distance-SMP](https://github.com/regorxxx/Search-by-Distance-SMP): creates playlists with similar tracks comparing their set of genres and styles among other things. 'GRAPH' method. 
2. [Playlist-Tools-SMP](https://github.com/regorxxx/Playlist-Tools-SMP): a collection of tools which include the previous one and multiple implementations via menus (similar genres, only influences, etc.).

(*) Note:  
Obviously, to compute similarity between real music examples, more than genre/style similarity must be checked. The examples given also check for [key](https://github.com/regorxxx/Camelot-Wheel-Notation), BPM, moods, etc. This just covers the only thing which may not be compared with 'simple string matching'.

# Caveats and other comments
## The closed-source nature of 'usable' musical analysis data:
Network players and servers like Spotify, Itunes Genius, YouTube, etc. offer similar services to these scripts and their real world implementations. Whenever you play a track within their players, similar tracks are offered on a regular basis. All the work is done on the servers, so it seems to be magic for the user. There are 2 important caveats for this approach: It only works because the tracks have been previously analyzed ('tagged') on their server. And all the data is closed source and network dependent. i.e. you can always listen to Spotify and your great playlist. At least while you pay them, those tracks are not removed for your region and you have a constant Internet connection.

That music listening model has clear drawbacks, and while the purpose of this caveat is not talking about them, at least we have to note the closed source nature of that analysis data. Spotify's data is not the same than Youtube's data... and for sure, you can not make use of that data for your library in any way. Ironically, being at a point where machine learning and other methods of analysis are ubiquitous, they are mostly relegated behind a pay-wall. And every time a company or a developer wants to create similar features, they must start from scratch and create their own data models.

An offline similar program which does the same would be [MusicIP](https://spicefly.com/article.php?page=what-is-musicip). It appeared as a viable alternative to that model, offering both an Internet server and a complete ability to analyze files offline as fall-back. Nowadays, the company is gone, the software is obsolete (although usable!) and documentation is missing for advanced features. The main problems? It was meant as a standalone solution, so there is no easy way to connect other programs to its local server to create playlists on demand. It can be done, but requires manually refreshing and maintaining the server database with new tag changes, data analysis, and translating ratings (from foobar for ex.) to the program. The other big problem is analysis time. It may well take a minute per track when calculating all the data needed... and the data is also closed source (so it has no meaning outside the program). The reason it takes so much time is simple, the program was created when machine learning was not a reality. MusicIP may well have been ahead of its time.

## An open-source solution:
Back to topic, both online and offline methods due to its closed source nature greatly difficult interoperability between different programs and use-cases. These scripts offer a solution to both problems, relying only in offline data (graph definition and your tags) and open source data (graph definition and your tags again). A graph approach to genre similarity may not be perfect, neither it is a machine learning model. The first only works as long as someone sets 2 thing as 'similar' and the tracks have been tagged accordingly. The second method has in fact the same problem! The machine learning models for genre classification are pretty weak at best, they must be provided with a reference set (so the genres are 'pre-set') and the tracks must be tagged at some point too. Obviously, if you play tracks from internet, the source is already tagged at the source, but in any other case, the tagging process must be done by the user like in the first case. In both cases the tracks may be automatically tagged using tools like Picard, discogs, acousticbrainz (so machine learning models may be used too), etc. 

Even at a point where tracks could be automatically tagged just by saying 'Hey Google, tell me the genre of this track', that's the thing you must only do once for all your files. Once they are tagged, real world implementations of the graph approach will always work in your PC, no matter if you don't have internet, Spotify closes or you run the thing within a RaspPi.

# Dependencies
All external dependencies are included in the 'ngraph' folder. They have been modified to work loaded along [Spider Monkey Foobar's scripts](https://github.com/TheQwertiest/foo_spider_monkey_panel) too but you can easily replace them with the original ones for html rendering. As is, they work in both cases.

For graph creation [ngraph](https://github.com/anvaka/ngraph) has been used and for graph visualization [VivaGraphJs](https://github.com/anvaka/VivaGraphJS). 

Some extra helpers for html rendering are included in the 'html' subfolder (functions for color inversion and star drawing). 