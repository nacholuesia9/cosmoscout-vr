# ------------------------------------------------------------------------------------------------ #
#                                This file is part of CosmoScout VR                                #
# ------------------------------------------------------------------------------------------------ #

# SPDX-FileCopyrightText: German Aerospace Center (DLR) <cosmoscout@dlr.de>
# SPDX-License-Identifier: MIT

# build library ------------------------------------------------------------------------------------

file(GLOB SOURCE_FILES *.cpp */*.cpp)

# Header files are only added in order to make them available in your IDE.
file(GLOB HEADER_FILES *.hpp */*.hpp)

add_library(cs-utils SHARED
  ${SOURCE_FILES}
  ${HEADER_FILES}
)

target_link_libraries(cs-utils
  PUBLIC
    glm::glm
    doctest::doctest
    tinygltf::tinygltf
    Boost::filesystem
    Boost::chrono
    Boost::date_time
    GLEW::GLEW
    GLUT::GLUT
    OpenGL::GL
    OpenGL::GLU
    OpenSG::base
    OpenSG::system
    Tiff::Tiff
    Tiff::Tiffxx
    ${VISTACORELIBS_LIBRARIES}
    ${CMAKE_DL_LIBS}
    cspice::cspice
    curl::curl
    curlpp::curlpp
    c-ares::c-ares
    spdlog::spdlog
)

if(COSMOSCOUT_USE_PRECOMPILED_HEADERS)
  target_precompile_headers(cs-utils PRIVATE precompiled.pch)
endif()

target_include_directories(cs-utils
  PUBLIC
    ${VISTACORELIBS_INCLUDE_DIRS}
)

# Make directory structure available in your IDE.
source_group(TREE "${CMAKE_CURRENT_SOURCE_DIR}" PREFIX "src" FILES
  ${SOURCE_FILES} ${HEADER_FILES}
)

# install the library ------------------------------------------------------------------------------

install(TARGETS cs-utils DESTINATION lib)

# export header ------------------------------------------------------------------------------------

generate_export_header(cs-utils
  EXPORT_FILE_NAME cs_utils_export.hpp
)
