<?php
namespace WordCamp\Blocks\Patterns;

/**
 * Actions & filters.
 */
add_action( 'init', __NAMESPACE__ . '\register_patterns', 5 ); // Register our patterns early, so they're first in the list.

/**
 * Register the block patterns.
 */
function register_patterns() {
	// Set up some categories (?).
	register_block_pattern_category( 'wordcamp', array( 'label' => _x( 'WordCamp', 'Block pattern category', 'wordcamporg' ) ) );

	// Sessions.
	register_block_pattern(
		'wordcamp/session-list-basic',
		array(
			'title'      => __( 'Session list with description', 'wordcamporg' ),
			'blockTypes' => array( 'core/query' ),
			'categories' => array( 'wordcamp' ),
			'content'    => get_pattern_content( 'session-list-basic' ),
		)
	);
	register_block_pattern(
		'wordcamp/session-list-centered',
		array(
			'title'      => __( 'Session list, centered', 'wordcamporg' ),
			'blockTypes' => array( 'core/query' ),
			'categories' => array( 'wordcamp' ),
			'content'    => get_pattern_content( 'session-list-centered' ),
		)
	);

	// Speakers.
	register_block_pattern(
		'wordcamp/speaker-grid-basic',
		array(
			'title'      => __( 'Basic speaker grid', 'wordcamporg' ),
			'blockTypes' => array( 'core/query' ),
			'categories' => array( 'wordcamp' ),
			'content'    => get_pattern_content( 'speaker-grid-basic' ),
		)
	);
	register_block_pattern(
		'wordcamp/speaker-grid-bio',
		array(
			'title'      => __( 'Speaker grid with bio', 'wordcamporg' ),
			'blockTypes' => array( 'core/query' ),
			'categories' => array( 'wordcamp' ),
			'content'    => get_pattern_content( 'speaker-grid-bio' ),
		)
	);
	register_block_pattern(
		'wordcamp/speaker-grid-centered',
		array(
			'title'      => __( 'Speaker grid, centered', 'wordcamporg' ),
			'blockTypes' => array( 'core/query' ),
			'categories' => array( 'wordcamp' ),
			'content'    => get_pattern_content( 'speaker-grid-centered' ),
		)
	);
	register_block_pattern(
		'wordcamp/speaker-list-basic',
		array(
			'title'      => __( 'Basic speaker list', 'wordcamporg' ),
			'blockTypes' => array( 'core/query' ),
			'categories' => array( 'wordcamp' ),
			'content'    => get_pattern_content( 'speaker-list-basic' ),
		)
	);
	register_block_pattern(
		'wordcamp/speaker-list-bio',
		array(
			'title'      => __( 'Speaker list with bio', 'wordcamporg' ),
			'blockTypes' => array( 'core/query' ),
			'categories' => array( 'wordcamp' ),
			'content'    => get_pattern_content( 'speaker-list-bio' ),
		)
	);
}

/**
 * Load the content from a pattern file, return as a string.
 *
 * @param string $slug
 * @return string
 */
function get_pattern_content( $slug ) {
	$path = __DIR__ . "/$slug.html";
	if ( ! file_exists( $path ) ) {
		return '';
	}

	ob_start();
	require( $path );
	return ob_get_clean();
}
