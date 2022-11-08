////////////////////////////////////////////////////////////////////////////////////////////////////
//                               This file is part of CosmoScout VR                               //
////////////////////////////////////////////////////////////////////////////////////////////////////

// SPDX-FileCopyrightText: German Aerospace Center (DLR) <cosmoscout@dlr.de>
// SPDX-License-Identifier: MIT

#include "Node.hpp"

#include "NodeGraph.hpp"
#include "WebSocket.hpp"

#include <algorithm>

namespace csl::nodeeditor {

////////////////////////////////////////////////////////////////////////////////////////////////////

void Node::setID(uint32_t id) {
  mID = id;
}

////////////////////////////////////////////////////////////////////////////////////////////////////

void Node::setSocket(std::shared_ptr<WebSocket> socket) {
  mSocket = std::move(socket);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

void Node::setGraph(std::shared_ptr<NodeGraph> graph) {
  mGraph = std::move(graph);
}

////////////////////////////////////////////////////////////////////////////////////////////////////

void Node::sendMessageToJS(nlohmann::json const& message) const {
  nlohmann::json json = {{"toNode", mID}, {"message", message}};
  mSocket->sendMessage(json.dump());
}

////////////////////////////////////////////////////////////////////////////////////////////////////

} // namespace csl::nodeeditor
