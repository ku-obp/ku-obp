import type {
  MessageDecoder,
  MessageEncoder,
  WidgetState,
} from "@livekit/components-core";
import { isEqualTrackRef, isWeb, log } from "@livekit/components-core";
import { DataPacket_Kind, RoomEvent, Track } from "livekit-client";
import { useState } from "react";
import type { MessageFormatter } from "@livekit/components-react";

import {
  CarouselLayout,
  ConnectionStateToast,
  FocusLayoutContainer,
  LayoutContextProvider,
  ParticipantTile,
  RoomAudioRenderer,
  useCreateLayoutContext,
  usePinnedTracks,
  useTracks,
  Chat,
  ControlBar,
  useDataChannel,
  useParticipants,
  ParticipantName,
  ParticipantLoop,
} from "@livekit/components-react";


import Monopoly from "./monopoly/monopoly"

export interface VideoConferenceProps
  extends React.HTMLAttributes<HTMLDivElement> {
  chatMessageFormatter?: MessageFormatter;
  chatMessageEncoder?: MessageEncoder;
  chatMessageDecoder?: MessageDecoder;
  room?: any;
}

export const MonopolyRoom = ({
  chatMessageFormatter,
  chatMessageDecoder,
  chatMessageEncoder,
  room,
  ...props
}: VideoConferenceProps) => {
  const [widgetState, setWidgetState] = useState<WidgetState>({
    showChat: false,
    unreadMessages: 0,
  });

  const { message, send } = useDataChannel("monopoly");
  const movePublisher = (move: { from: string; to: string }) => {
    const moveJson = JSON.stringify(move);
    const encoder = new TextEncoder();
    const data = encoder.encode(moveJson);
    send(data, { kind: DataPacket_Kind.RELIABLE });
  };

  let receivedData = new TextDecoder().decode(message?.payload);

  const tracks = useTracks(
    [{ source: Track.Source.Camera, withPlaceholder: true }],
    { updateOnlyOn: [RoomEvent.ActiveSpeakersChanged], onlySubscribed: false }
  );

  const widgetUpdate = (state: WidgetState) => {
    log.debug("updating widget state", state);
    setWidgetState(state);
  };

  const layoutContext = useCreateLayoutContext();

  const focusTrack = usePinnedTracks(layoutContext)?.[0];
  const carouselTracks = tracks.filter(
    (track) => !isEqualTrackRef(track, focusTrack)
  );

  const participants = useParticipants();
  console.log(participants.length);

  return (
    <div className="lk-video-conference" {...props}>
      {isWeb() && (
        <LayoutContextProvider
          value={layoutContext}
          // onPinChange={handleFocusStateChange}
          onWidgetChange={widgetUpdate}
        >
          <div className="lk-video-conference-inner">
            <div className="lk-focus-layout-wrapper">
              <FocusLayoutContainer>
                <CarouselLayout tracks={carouselTracks}>
                  <ParticipantTile />
                </CarouselLayout>
                <Monopoly/>
              </FocusLayoutContainer>
            </div>
            <ControlBar controls={{ chat: true, screenShare: false }} />
          </div>
          <Chat
            style={{ display: widgetState.showChat ? "flex" : "none" }}
            messageFormatter={chatMessageFormatter}
            messageEncoder={chatMessageEncoder}
            messageDecoder={chatMessageDecoder}
          />
        </LayoutContextProvider>
      )}
      <RoomAudioRenderer />
      <ConnectionStateToast />
    </div>
  );
};

{
  /* <button onClick={() => movePublisher({ from: "e2", to: "e4" })}>
Button
</button>
{message && (
<div>
  Received message:
  {new TextDecoder().decode(message.payload)}
</div>
)} */
}
  