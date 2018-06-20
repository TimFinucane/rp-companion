include( ${CMAKE_CURRENT_LIST_DIR}/accounts/CMakeLists.txt )

target_sources(harper-server
	PRIVATE
	${CMAKE_CURRENT_LIST_DIR}/main.cpp
)